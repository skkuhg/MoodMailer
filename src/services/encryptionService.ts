import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class EncryptionService {
  private static readonly KEY_STORAGE = 'encryption_key';
  private static readonly IV_LENGTH = 16;

  static async getOrCreateKey(): Promise<string> {
    try {
      let key = await AsyncStorage.getItem(this.KEY_STORAGE);
      
      if (!key) {
        key = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          `${Date.now()}-${Math.random()}-${Crypto.randomUUID()}`,
          { encoding: Crypto.CryptoEncoding.HEX }
        );
        await AsyncStorage.setItem(this.KEY_STORAGE, key);
      }
      
      return key;
    } catch (error) {
      throw new Error(`Failed to get encryption key: ${error}`);
    }
  }

  static async encryptText(plaintext: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      
      const iv = await Crypto.getRandomBytesAsync(this.IV_LENGTH);
      const ivHex = Array.from(iv)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const encrypted = await this.xorEncrypt(plaintext, key);
      
      return `${ivHex}:${encrypted}`;
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  static async decryptText(encryptedData: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      const [ivHex, encrypted] = encryptedData.split(':');
      
      if (!ivHex || !encrypted) {
        throw new Error('Invalid encrypted data format');
      }

      const decrypted = await this.xorDecrypt(encrypted, key);
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error}`);
    }
  }

  private static async xorEncrypt(text: string, key: string): Promise<string> {
    const keyHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      key,
      { encoding: Crypto.CryptoEncoding.HEX }
    );
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = keyHash.charCodeAt(i % keyHash.length);
      const encrypted = textChar ^ keyChar;
      // Convert to hex to avoid base64 issues with binary data
      result += encrypted.toString(16).padStart(2, '0');
    }
    
    return result;
  }

  private static async xorDecrypt(encrypted: string, key: string): Promise<string> {
    const keyHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      key,
      { encoding: Crypto.CryptoEncoding.HEX }
    );
    
    let result = '';
    
    // Convert from hex back to numbers
    for (let i = 0; i < encrypted.length; i += 2) {
      const hexByte = encrypted.substr(i, 2);
      const encryptedChar = parseInt(hexByte, 16);
      const keyChar = keyHash.charCodeAt((i / 2) % keyHash.length);
      result += String.fromCharCode(encryptedChar ^ keyChar);
    }
    
    return result;
  }

  static async clearKey(): Promise<void> {
    await AsyncStorage.removeItem(this.KEY_STORAGE);
  }
}
