const usernames = ['user1', 'user2', 'user3', 'user4', 'horspool'];

function horspool(text, pattern) {
    const table = {};

    for (let i = 0; i < pattern.length - 1; i++) {
        table[pattern[i]] = pattern.length - 1 - i;
    }

    let i = pattern.length - 1;
    while (i < text.length) {
        let k = 0;
        while (k < pattern.length && pattern[pattern.length - 1 - k] === text[i - k]) {
            k++;
        }

        if (k === pattern.length) {
            return i - pattern.length + 1;
        } else {
            i += table[text[i]] || pattern.length;
        }
    }

    return -1;
}

function checkAvailability() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username === '') {
        document.getElementById('availability').textContent = 'Please enter a username';
        return;
    }

    const index = horspool(usernames.join(','), username);
    if (index !== -1) {
        document.getElementById('availability').textContent = `Username '${username}' is not available`;
    } else {
        document.getElementById('availability').textContent = `Username '${username}' is available`;
    }
}
