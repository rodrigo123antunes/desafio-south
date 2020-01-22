class AppUtils {

    removeAccentuation(str) {
        let with_accent = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let without_accent = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        var newStr = "";

        for(var i = 0; i < str.length; i++) {
            var replace = false;

            for (var a = 0; a < with_accent.length; a++) {
                if (str.substr(i,1) === with_accent.substr(a,1)) {
                    newStr += without_accent.substr(a, 1);
                    replace = true;

                    break;
                }
            }

            if (!replace) {
                newStr += str.substr(i, 1);
            }
        }

        return newStr;
    };
}

export default new AppUtils();
