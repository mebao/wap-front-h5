<script>
export default {
    //保留两位小数
	toDecimal2: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return '0.00';
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
    	//小数点不足两位
    	if(s.length <= rs + 2){
	        while (s.length <= rs + 2) {
	            s += '0';
	        }
    	}else{
    		//小数点超过两位
    		s = s.substring(0, rs + 3);
    	}
        return s;
    },
    formatDate: function(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    }
}
</script>
