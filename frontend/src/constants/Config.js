const date = new Date();
const year = date.getFullYear();

const config = {
    brand: 'Fireballs',
    brandLong: 'Fireballs in the Sky',
    user: 'Scott Day',
    year,
    productLink: 'http://fireballsinthesky.com.au/',
    AutoCloseMobileNav: true,                         // true, false. Automatically close sidenav on route change (Mobile only)
    color: {
        primary: '#00BCD4',
        success: '#8BC34A',
        info: '#66BB6A',
        infoAlt: '#7E57C2',
        warning: '#FFCA28',
        danger: '#F44336',
        text: '#3D4051',
        gray: '#EDF0F1'
    },
    settings: {
        layoutBoxed: false,                             // true, false
        navCollapsed: false,                            // true, false
        navBehind: false,                               // true, false
        fixedHeader: true,                              // true, false
        sidebarWidth: 'middle',                         // small, middle, large
        colorOption: '14',                              // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        theme: 'light'                                 // light, gray, dark
    },
    api: {
        url: "http://localhost:5000/api",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": "true",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
};

module.exports = config;
