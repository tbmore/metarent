export const anchor = new Map();
anchor.set("Listing details", [
    {
        title: "Photos",
        path: "#Photos",
    },
    {
        title: "Listing basics",
        path: "#Listing basics",
    },
    {
        title: "Amenities",
        path: "#Amenities",
    },
    {
        title: "Location",
        path: "#Location",
    },
    {
        title: "Property and rooms",
        path: "#Property and rooms",
    },
    {
        title: "Accessibility",
        path: "#Accessibility",
    },
    {
        title: "Guest safety",
        path: "#Guest safety",
    },
]);
anchor.set("Pricing and availability", [
    {
        title: "Pricing",
        path: "#Pricing",
    },
    {
        title: "Discounts",
        path: "#Discounts",
    },
    {
        title: "Additional charges",
        path: "#Additional charges",
    },
    {
        title: "Scheduled settings",
        path: "#Scheduled settings",
    },
]);
anchor.set("Policies and rules", [
    {
        title: "Policies",
        path: "#Policies",
    },
    {
        title: "Reservation notice",
        path: "#Reservation notice",
    },
    {
        title: "Laws and regulations",
        path: "#Laws and regulations",
    },
]);
anchor.set("Notice to Tenants", [
    {
        title: "Check-in Instructions",
        path: "#Check-in Instructions",
    },
    {
        title: "Check-in Guidelines",
        path: "#Check-in Guidelines",
    },
]);
anchor.set("Property evaluation", [

]);

// 驼峰式命名转换 Pricing and availability  =>  pricingAndAvailability
export const strCamelCase = (str: string): string => {
    return str.split(' ').map((item, idx) => idx == 0 ? item.replace(item.charAt(0), item.charAt(0).toLocaleLowerCase()) : item.replace(item.charAt(0), item.charAt(0).toLocaleUpperCase())).join('')
}

// url转首个HASH /listings/detailed/noticeToTenants  =>  #xxx    'noticeToTenants'.match(/[a-z]+|[A-Z][a-z]+/g) => ['notice', 'To', 'Tenants']
export const urlToHash = (str: string): string => {
    const idx = str.lastIndexOf('/')
    if (idx === -1) return ''
    const _str = str.slice(idx + 1)
    let hash = ''
    for (let [key, value] of anchor.entries()) {
        if (strCamelCase(key) == _str) {
            hash = value.length ? value[0].path : `#${key}`
        }
    }
    return hash
}
// hash 求 路径
export const checkHash = (item: { title: string; href: string }): string => {
    let path = '';
    for (let [key, value] of anchor) {
        if (value.find(val => val.title == item.title)) {
            path = key
        }
    }

    return strCamelCase(path)
};