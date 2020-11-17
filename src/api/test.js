import request from "@/utils/request";

export default {
    getDate(){
        const req = request({
            url:"db.json",
            method:"get"
        })
        return req;
    }
}