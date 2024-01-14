const stringToColor = (string: string) => {
    const hash = string.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0x7f007f);

    const color = Array.from({ length: 3 }, (_, i) =>
        `00${((hash >> (i * 8)) & 0xff).toString(16)}`.slice(-2),
    ).join('');

    return `#${color}`;
};

function stringAvatar(name: string) {
    const nameParts = name.split(' ').filter(Boolean);
    const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : ''; // 转换为大写
    const lastInitial =
        nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : ''; // 转换为大写

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${firstInitial}${lastInitial}`,
    };
}

export default stringAvatar;
