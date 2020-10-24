/**
 * flag 常量
 */
class FlagConstant {
    /**
     * 是
     * @type {{bool: boolean, tinyEn: string, num: number, en: string}}
     */
    static TRUE = {'bool': true, 'num': 1, 'tinyEn': 'y', 'en': 'yes'};

    /**
     * 否
     * @type {{bool: boolean, tinyEn: string, num: number, en: string}}
     */
    static FALSE = {'bool': false, 'num': 0, 'tinyEn': 'n', 'en': 'no'};

    /**
     * 数字转化为flag
     * @param num {Number}
     * @return {{bool: boolean, tinyEn: string, num: number, en: string}|null}
     */
    static numToFlag(num) {
        switch (num) {
            case this.TRUE.num:
                return this.TRUE;
            case this.FALSE.num:
                return this.FALSE;
            default:
                return null;
        }
    }

    /**
     * boolean to flag
     * @param bool {Boolean
     * @return {{bool: boolean, tinyEn: string, num: number, en: string}|null}
     */
    static booleanToFlag(bool) {
        switch (bool) {
            case this.TRUE.bool:
                return this.TRUE;
            case this.FALSE.bool:
                return this.FALSE;
            default:
                return null;
        }
    }

}

module.exports = FlagConstant
