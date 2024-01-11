const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    hash += 0x7f800000;

    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
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
