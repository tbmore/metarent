export const Action = {
    domain: null,
    // 登录注册
    LoginPw: '/api/user/phone/public/loginByPassword',    // 密码登录
    LoginPhone: '/api/user/phone/public/login',              // 验证码登录

    GetAwsToken: 'https://api.imetalk.net/aws/getToken',                         // 亚马逊token

    getDomain(ws) {
        let protocol = Action.getProtocol(ws);
        if (Star.domain) {
            return protocol + Star.domain;
        }
    },

    getProtocol(ws) {
        let starframe = require('../../../../../../package').starframe;
        let protocol = starframe.domain == 'local' ? (ws ? 'ws://' : 'http://') : (ws ? 'wss://' : 'https://')
        return protocol;
    },

    getOrigin() {
        let starframe = require('../../../../../../package').starframe;
        let origin = starframe.server[starframe.domain];
        return origin;
    }
};
