MySQL Database Creation Script for MySQL Workbench

```SQL
CREATE TABLE `student` (
`studentid` int NOT NULL,
`name` varchar(45) DEFAULT 'John Doe',
UNIQUE KEY `studentid_UNIQUE` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `course` (
`courseid` int NOT NULL AUTO_INCREMENT,
`time` int DEFAULT NULL
`days` set('M','T','W','Th','F') DEFAULT NULL,
`name` varchar(45) DEFAULT NULL,
`SI` int DEFAULT NULL,
PRIMARY KEY (`courseid`),
KEY `SI_id_idx` (`SI`),
CONSTRAINT `SI_id` FOREIGN KEY (`SI`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci KEY_BLOCK_SIZE=2;

CREATE TABLE `conflict` (
`student` int NOT NULL,
`time` int DEFAULT NULL,
`day` int DEFAULT NULL,
KEY `student_od_idx` (`student`),
CONSTRAINT `student_id` FOREIGN KEY (`student`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

1. For adding a course (courseid will automatically increment)

```SQL
INSERT INTO course(time, days, name)

VALUES (YOUR_TIME, YOUR_DAYS, YOUR_NAME)
```

`YOUR_TIME` is an integer based on time block from `800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535`

`YOUR_DAYS` will look like `M,T,W,Th,F` or `M,W,F` or `T,Th`, etc. _ORDER DOES MATTER_

`YOUR_NAME` is a string(EX `CS-144`)

2. Deleting a course

Outwardly we don’t really want to show the `courseid` (since its meaningless to end-user), but you need it delete the row(it is the only unique identifier) so backend should keep track of it when displaying

```SQL
DELETE FROM course
WHERE courseid = YOUR_COURSEID
```

Back-end object should keep track of courseid so it can be deleted when time is right

3. Adding a conflict

```SQL
INSERT INTO conflict(student, time, day)
VALUES(YOUR_STUDENTID, YOUR_TIME, YOUR_DAY)
```

`YOUR_STUDENTID` should be the integer id of the student entering the conflict

`YOUR_TIME` is an integer from `800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535`

`YOUR_DAY` is also an integer 0-4 (corresponding to `M` -> `F`)

4. Delete conflict (ALL data types are int for conflict)

a. To Delete a specific conflict

```SQL
DELETE FROM conflict
WHERE student = YOUR_ID AND time = YOUR_TIME AND day = YOUR_DAY
```

b. To Delete all conflicts for a specific student (and subsequently re-enter them)

```SQL
DELETE FROM conflict
WHERE student = YOUR_ID
```

5. To assign an SI

```SQL
UPDATE course
SET SI = YOUR_STUDENTID
WHERE courseid = YOUR_COURSEID
```

This will assign the corresponding student to the course. That means to do this you must know the student’s ID number and the ID number for the course. Thus it will be important for that to be stored somewhere on the website.

This also doesn’t handle any of the filtering for conflict times. It will be best to do that in Javascript where you can loop and whatnot. Directly querying it is very difficult, if it’s even possible.

6. Remove an SI

```SQL
UPDATE course
SET SI = NULL
WHERE courseid = YOUR_COURSEID
```

Same as above but instead of assigning a number, you just set the SI to `null`

7. All Courses

```SQL
SELECT \*
FROM course
```

8. All student conflicts

```SQL
SELECT \*
FROM student
LEFT JOIN conflict ON conflict.student = student.studentid
```

MORE POTENTIALLY USEFUL QUERIES

1. To see the SI’s name that is assigned to a class. Will also

```SQL
SELECT course.name, student.name
from course
LEFT JOIN student ON studentid = SI
```

2. To see only courses with no assigned SI

```SQL
SELECT course.name, student.name
from course
LEFT JOIN student ON studentid = SI
WHERE student.name IS NULL
```

3. Only courses WITH an assigned SI

```SQL
SELECT course.name, student.name
from course
LEFT JOIN student ON studentid = SI
WHERE student.name IS NOT NULL
```

4. All courses for a specific time

```SQL
SELECT \*
from course
WHERE time = YOUR_TIME
```

5. All courses that meet on a specific set of days

```SQL
SELECT \*
from course
WHERE days = "M,T,W,Th" -> Change this for the set of days you want
```
