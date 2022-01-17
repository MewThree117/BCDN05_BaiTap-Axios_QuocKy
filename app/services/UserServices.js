function UserSevices() {

    this.layDS = function() {
        return  axios({
            method: 'get',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/User',
        });
    }

    this.themND = function(user) {
        return  axios({
            method: 'post',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/User',
            data: user,
        });
    }

    this.xoaND = function(id) {
        return  axios({
            method: 'delete',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/User/${id}`,
        });
    }

    this.layChiTiet = function(id) {
        return  axios({
            method: 'get',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/User/${id}`,
        });
    }

    this.capnhat = function(id, user) {
        return  axios({
            method: 'put',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/User/${id}`,
            data: user,
        });
    }
}