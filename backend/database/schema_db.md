**User**

first_name, last_name, email => string

password => string|hash

role => fk Role|1toMany

site =>fk ConstructionSite|1toMany

admin => int

deleted_at => softDelete()

**Role**

name, icon => string

**ConstructionSite**

title, client, location => string

start_date, end_date => date

status => enum[open, closed, not started]

director => fk User|1toMany

**Report**

site => fk ConstructionSite|1toMany

sending_date => date

sending_check => int

**ReportLine**

line => text 

image => string

problem => enum[no, yes , critical]

author => fk User|1toMany

report => fk Report|1toMany

creation_date (inherited)

