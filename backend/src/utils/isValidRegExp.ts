export function isValidRegexSimple(pattern: string): boolean {
    try {
        new RegExp(pattern);
        return true;
    } catch (e) {
        return false;
    }
}

export function isValidRegex(string: string): boolean {
    try {
      const m = string.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
      if (!m) return false;
      const [, , pattern, flags] = m;
      
      if (new Set(flags).size !== flags.length) return false;
      
      new RegExp(pattern, flags);
      return true;
    } catch (e) {
      return false;
    }
  }