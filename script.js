function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '@#$%&';

    let allChars = '';
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === '') {
        document.getElementById('result').innerText = 'Please select at least one character type.';
        return;
    }

    let password = '';
    let typesCount = 0;
    const typesArr = [
        { include: includeUppercase, chars: uppercaseChars },
        { include: includeLowercase, chars: lowercaseChars },
        { include: includeNumbers, chars: numberChars },
        { include: includeSymbols, chars: symbolChars }
    ].filter(item => item.include);

    // Ensure at least one character from each selected type is included
    typesArr.forEach(type => {
        if (type.include) {
            password += type.chars[Math.floor(Math.random() * type.chars.length)];
            typesCount++;
        }
    });

    // Fill the rest of the password length with random characters from all selected types
    for (let i = typesCount; i < length; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        password += randomType.chars[Math.floor(Math.random() * randomType.chars.length)];
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    document.getElementById('result').innerText = password;
}