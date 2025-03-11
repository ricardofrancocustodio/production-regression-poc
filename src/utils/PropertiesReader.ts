import * as fs from 'fs';
import * as path from 'path';

export class PropertiesReader {
    private static properties: Record<string, Record<string, string>> = {};

    private static loadProperties(filePath: string): Record<string, string> {
        const properties: Record<string, string> = {};
        try {
            const fullPath = path.resolve(__dirname, filePath);
           // console.log(`Loading properties from: ${fullPath}`); // 📌 Debug log

            const data = fs.readFileSync(fullPath, 'utf-8');
            data.split('\n').forEach(line => {
                line = line.trim();
                if (line.startsWith("#") || !line.includes("=")) return; // Ignorar comentários e linhas inválidas
                
                // Ajuste: dividir apenas no primeiro "=" e manter o restante intacto
                const key = line.substring(0, line.indexOf('=')).trim();
                const value = line.substring(line.indexOf('=') + 1).trim();

                if (key && value) {
                    properties[key] = value;
                }
            });
        } catch (error) {
            console.error(`❌ Failed to load properties file: ${filePath}`, error);
            throw new Error(`Failed to load properties file: ${filePath}`);
        }
        return properties;
    }

    static {
        try {
            this.properties["locators"] = this.loadProperties('../../config/locators.properties');
            this.properties["credentials"] = this.loadProperties('../../config/credentials.properties');
            this.properties["config"] = this.loadProperties('../../config/config.properties');
            this.properties["urls"] = this.loadProperties('../../config/url.properties');
        } catch (error) {
            console.error(`❌ Error initializing PropertiesReader:`, error);
        }
    }

    static getLocator(key: string): string {
        let locator = this.properties["locators"]?.[key];

        //console.log(`🔍 Fetching locator for key: ${key}, Value: ${locator}`); // Debug

        if (!locator) {
            throw new Error(`❌ Locator for '${key}' not found in locators.properties`);
        }

        // Ajuste: Separar o tipo do locator e o valor real sem truncar XPath com apóstrofos
        const separatorIndex = locator.indexOf("=");
        if (separatorIndex === -1) {
            throw new Error(`❌ Invalid locator format for key '${key}': ${locator}`);
        }

        const type = locator.substring(0, separatorIndex).trim();
        const value = locator.substring(separatorIndex + 1).trim();

        //console.log(`✅ Processed locator -> Type: ${type}, Value: ${value}`); // Debug final

        // Converter para o formato Playwright
        switch (type) {
            case "id":
                return `#${value}`;
            case "xpath":
                return `xpath=${value}`; // XPath agora será lido corretamente
            case "cssSelector":
                return value;
            case "className":
                return `.${value}`;
            case "name":
                return `[name="${value}"]`;
            case "tagName":
                return value;
            default:
                throw new Error(`❌ Unsupported locator type: ${type}`);
        }
    }

    static getCredentials(key: string): string {
        const value = this.properties["credentials"]?.[key];
        if (!value) throw new Error(`❌ Credential for '${key}' not found in credentials.properties`);
        return value;
    }

    static getConfig(key: string): string {
        const value = this.properties["config"]?.[key];
        if (!value) throw new Error(`❌ Config for '${key}' not found in config.properties`);
        return value;
    }

    static getUrl(key: string): string {
        const value = this.properties["urls"]?.[key];
        if (!value) throw new Error(`❌ URL for '${key}' not found in url.properties`);
        return value;
    }
}
