1. db.queries.find({region:"Asia"});
2. db.queries.find({currency:"EUR"});
3. db.queries.find({"timezones.gmtOffset":3600});
4. db.queries.find({"timezones.gmtOffset":3600},{"timezones.tzName":"Central European Time"})