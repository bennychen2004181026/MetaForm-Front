const stringToColor = (string: string) => {
    const hash =
        string.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0) +
        0x7f800000;

    const color = Array.from({ length: 3 }, (_, i) =>
        `00${((hash >> (i * 8)) & 0xff).toString(16)}`.slice(-2),
    ).join('');

    return `#${color}`;
};

function stringAvatar(name: string) {
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0][0];
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${firstInitial}${lastInitial}`,
    };
}

export default stringAvatar;
