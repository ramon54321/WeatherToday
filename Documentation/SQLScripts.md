## Get data by locations
``` SQL
SELECT t2.location, COALESCE(t1.min, 0) as min, COALESCE(t1.max, 0) as max, t2.latest FROM
(
	WITH results24 AS
	(
		SELECT location as location, min(temperature) as min, max(temperature) as max
		FROM temperature
		WHERE time > now() - interval '24 hours'
		GROUP BY location
	)

	SELECT location, min, max FROM results24

	UNION

	SELECT location, latest as min, latest as max FROM
	(SELECT DISTINCT ON (location) location as location, temperature as latest
	FROM temperature
	ORDER BY location, time DESC) latestTemp

	WHERE NOT EXISTS (SELECT * FROM results24)
) t1

RIGHT OUTER JOIN

(SELECT DISTINCT ON (location) location as location, temperature as latest
FROM temperature
ORDER BY location, time DESC) t2

ON t2.location = t1.location

ORDER BY location
```

## Initialize DB with fake data

``` SQL
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 6);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 3);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 1);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', -1);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', -4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', -8);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', -7);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', -4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 0);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Helsinki', 2);

INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 10);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 14);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 8);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 6);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 3);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 6);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 4);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 7);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 12);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Amsterdam', 10);

INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 43);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 39);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 35);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 31);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 29);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 30);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 32);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 31);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 36);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 38);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 38);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Dubai', 40);

INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 19);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 21);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 22);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 17);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 15);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 16);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 13);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 16);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 17);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 21);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 22);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'New York', 23);

INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 28);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 29);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 30);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 27);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 24);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 19);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 18);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 24);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 26);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 28);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 31);
INSERT INTO temperature (time, location, temperature) VALUES (now(), 'Tokyo', 31);
```
