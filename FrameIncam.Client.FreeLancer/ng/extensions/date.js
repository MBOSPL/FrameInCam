(function ($, ng, debugMode, undefined)
{
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");
    var fincam = ng.fincam;

    module.run([
        "$rootScope",
        "$filter",
        function (
            p_$rootScope,
            p_$filter,
            undefined
        )
        {
            // --------------------------------------------------------------------------------
            // Constant
            // --------------------------------------------------------------------------------
            p_$rootScope.minTimestamp = Date.minTimestamp = 0;
            p_$rootScope.maxTimestamp = Date.maxTimestamp = 253402261199999;
            p_$rootScope.dateFormat = Date.dateFormat = "dd/MM/yyyy";
            p_$rootScope.shortDateFormat = Date.shortDateFormat = "d/M/yy";
            p_$rootScope.longDateFormat = Date.longDateFormat = "ddd d MMM yyyy";
            p_$rootScope.timeFormat = Date.timeFormat = "hh:mm tt";
            p_$rootScope.shortTimeFormat = Date.shortTimeFormat = "H:mm";
            p_$rootScope.longTimeFormat = Date.longTimeFormat = "hh:mm:ss tt";
            p_$rootScope.shortDateTimeFormat = Date.shortDateTimeFormat = Date.dateFormat + ' ' + Date.timeFormat;
            p_$rootScope.longDateTimeFormat = Date.longDateTimeFormat = Date.longDateFormat + ' ' + Date.longTimeFormat;
            p_$rootScope.firstDayOfWeek = Date.firstDayOfWeek = 1;

            // --------------------------------------------------------------------------------
            // Functions
            // --------------------------------------------------------------------------------
            if (!Date.now)
                Date.now = function ()
                {
                    return new Date();
                }

            if (!Date.today)
                Date.today = function ()
                {
                    return new Date().clearTime();
                }

            if (!Date.min)
                Date.min = function ()
                {
                    return new Date(Date.minTimestamp);
                }

            if (!Date.max)
                Date.max = function ()
                {
                    return new Date(Date.maxTimestamp);
                }

            if (!Date.getWeekDayLabel)
            {
                var weekDaysLabel = [];
                Date.getWeekDayLabel = function (p_dayOfWeek, p_length)
                {
                    if (weekDaysLabel.length === 0)
                    {
                        var d = Date.today();
                        d.setDate(d.getDate() - d.getDay());
                        for (var i = 0; i < 7; i++)
                        {
                            weekDaysLabel.push(d.format("dddd"));
                            d.setDate(d.getDate() + 1);
                        }
                    }

                    var result = weekDaysLabel[p_dayOfWeek % 7];
                    if (Number.isInteger(p_length)
                        && p_length > 0)
                    {
                        return result.substr(0, p_length);
                    }
                    else
                    {
                        return result;
                    }
                }
            }

            if (!Date.getShortWeekDayLabel)
            {
                var weekDaysLabel = [];
                Date.getShortWeekDayLabel = function (p_dayOfWeek, p_length)
                {
                    if (weekDaysLabel.length === 0)
                    {
                        var d = Date.today();
                        d.setDate(d.getDate() - d.getDay());
                        for (var i = 0; i < 7; i++)
                        {
                            weekDaysLabel.push(d.format("ddd"));
                            d.setDate(d.getDate() + 1);
                        }
                    }

                    var result = weekDaysLabel[p_dayOfWeek % 7];
                    if (Number.isInteger(p_length)
                        && p_length > 0)
                    {
                        return result.substr(0, p_length);
                    }
                    else
                    {
                        return result;
                    }
                }
            }

            var parse = Date.parse;
            Date.parse = function (p_value, p_dateFormat)
            {
                var dateFormat;
                if (String.isNullOrWhiteSpace(p_dateFormat))
                {
                    dateFormat = p_settings.dateFormat;
                }
                else
                {
                    switch (p_dateFormat)
                    {
                        default:
                            dateFormat = p_dateFormat.replace(/yyyy/gi, "YYYY")
                                .replace(/yy/gi, "YY")
                                .replace(/dd/gi, "DD")
                                .replace(/d/gi, "D")
                                .replace(/tt/gi, "a")
                                .replace(/fff/gi, "SSS")
                                .replace(/K/gi, "Z")
                                ;

                            break;
                    }
                }

                var d = moment(
                    p_value,
                    dateFormat
                );

                if (d.isValid())
                    return d.toDate();

                return parse(p_value);
            }

            // --------------------------------------------------------------------------------
            // Prototypes
            // --------------------------------------------------------------------------------
            if (!Date.prototype.equals)
                Date.prototype.equals = function (Date)
                {
                    var self = this;
                    return self.getTime().equals(Date.getTime());
                }

            if (!Date.prototype.clone)
                Date.prototype.clone = function ()
                {
                    var self = this;
                    return new Date(self.getTime());
                }

            if (!Date.prototype.clearTime)
                Date.prototype.clearTime = function ()
                {
                    var self = this;
                    self.setHours(0);
                    self.setMinutes(0);
                    self.setSeconds(0);
                    self.setMilliseconds(0);
                    return self;
                }

            if (!Date.prototype.setDateFrom)
                Date.prototype.setDateFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    self.setYear(p_targetDate.getFullYear());
                    self.setMonth(p_targetDate.getMonth());
                    self.setDate(p_targetDate.getDate());
                    return self;
                }

            if (!Date.prototype.setTimeFrom)
                Date.prototype.setTimeFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    self.setHours(p_targetDate.getHours());
                    self.setMinutes(p_targetDate.getMinutes());
                    self.setSeconds(p_targetDate.getSeconds());
                    self.setMilliseconds(p_targetDate.getMilliseconds());
                    return self;
                }

            if (!Date.prototype.setDateTimeFrom)
                Date.prototype.setDateTimeFrom = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return self;

                    return self.setDateFrom(p_targetDate).setTimeFrom(p_targetDate);
                }

            if (!Date.prototype.isWeekend)
                Date.prototype.isWeekend = function (p_targetDate)
                {
                    var self = this;
                    var dayOfWeek = self.getDay();
                    return dayOfWeek === 0
                        || dayOfWeek === 6;
                }

            if (!Date.prototype.format)
                Date.prototype.format = function (p_dateFormat, p_utc)
                {
                    var self;
                    if (p_utc === true)
                    {
                        self = this.clone();
                        self.setMinutes(self.getMinutes() + self.getTimezoneOffset());
                    }
                    else
                    {
                        self = this;
                    }

                    var dateFormat;
                    if (String.isNullOrWhiteSpace(p_dateFormat))
                    {
                        dateFormat = Date.longDateTimeFormat;
                    }
                    else
                    {
                        switch (p_dateFormat)
                        {
                            default:
                                dateFormat = p_dateFormat
                                    .replace(/dddd/gi, "EEEE")
                                    .replace(/ddd/gi, "EEE")
                                    .replace(/fff/gi, "sss")
                                    .replace(/tt/gi, "a")
                                    .replace(/K/gi, "Z")
                                    ;

                                break;
                        }
                    }

                    return p_$filter("date")(self, dateFormat);
                }

            if (!Date.prototype.dateOnly)
                Date.prototype.dateOnly = function ()
                {
                    var self = this;

                    var d = new Date(self);
                    d.setHours(0, 0, 0, 0);
                    return d;
                }

            if (!Date.prototype.isEqualDateOnly)
                Date.prototype.isEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    //if (self.toJSON().slice(0, 10) == p_targetDate.toJSON().slice(0, 10))
                    if (self.dateOnly().getTime() == p_targetDate.dateOnly().getTime())
                        return true;
                    else
                        return false;
                }


            if (!Date.prototype.isGreaterDateOnly)
                Date.prototype.isGreaterDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() > p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isGreaterEqualDateOnly)
                Date.prototype.isGreaterEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() >= p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isSmallerDateOnly)
                Date.prototype.isSmallerDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() < p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.isSmallerEqualDateOnly)
                Date.prototype.isSmallerEqualDateOnly = function (p_targetDate)
                {
                    var self = this;
                    if (!fincam.isDate(p_targetDate))
                        return false;

                    if (self.dateOnly() <= p_targetDate.dateOnly())
                        return true;
                    else
                        return false;
                }

            if (!Date.prototype.getFirstDateOfWeek)
                Date.prototype.getFirstDateOfWeek = function ()
                {
                    var self = this;                    
                    
                    var day = self.getDay() || 7; 
                    if (day == 1)
                    {
                        return new Date(self.getTime());
                    }
                    else
                    {
                        return new Date(self.getTime() - (24 * 60 * 60 * 1000) * (day - 1));                        
                    }
                }

            if (!Date.prototype.getLastDateOfWeek)
                Date.prototype.getLastDateOfWeek = function ()
                {
                    var self = this;

                    var day = self.getDay() || 7;
                    if (day == 0)
                    {
                        return new Date(self.getTime());
                    }
                    else
                    {
                        return new Date(self.getTime() + (24 * 60 * 60 * 1000) * (7 - day));
                    }
                }


            if (!Date.prototype.dateUTC)
                Date.prototype.dateUTC = function ()
                {
                    var self = this;
                    return new Date(self.getTime() + self.getTimezoneOffset() * 60000);
                }
        }
    ]);

})(jQuery, angular, document.children[0].hasAttribute("debug"));