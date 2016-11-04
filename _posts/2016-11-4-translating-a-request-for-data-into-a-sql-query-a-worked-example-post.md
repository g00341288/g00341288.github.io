---
layout:			post
title:			"Translating a Request for Data into a SQL Query - a Worked Example"
date:			2016-11-4
category:		News
description:	"This post introduces a rough-and-ready strategy for translating a request for data expressed in natural language into a SQL query."
tags:			update
meta-title:		"Translating requests for data into SQL queries"

author:			"Leonard M Reidy"
author-slug:	leonard-m-reidy
author-desc:	"Leonard M Reidy is the creator of ngBootUI and Jekyll Generic. He is a front end web designer and developer working out of rainy Galway."
author-url:		https://g00341288.github.io/
author-twitter:	leonardreidy
author-github:	leonardreidy
projects-jekyll-generic: "https://github.com/leonardreidy/jekyllgeneric"
projects-ngbootui: "https://github.com/leonardreidy/ngbootui"
permalink: 		blog/how-to-translate-a-request-for-data-into-a-sql-query
---

Writing effective SQL queries presents a number of challenges. But one that is often grossly underestimated is how difficult it can be to translate a request for data (or an exam question) into a meaningful, accurate and appropriate query in a reasonable amount of time. When a data request is expressed in natural language, which it almost always is, the structure of natural language itself can and often does obscure the logical and semantic structure of the data problem. 

There are a number of effective approaches to analysing problems expressed in natural language. But they tend to assume that the novice SQL developer will reason from the problem to the solution in a top-down way, starting with a more or less accurate picture of what the resulting relation (table) will look like. However, if you are not used to working with databases, or how business-relevant data is organised logically or otherwise, what the resulting relation (table) will look like is not always obvious. And here is the crux of the problem: if you cannot visualise the _result_ of the query you are attempting to build, how can you make sense of the mechanics of the query itself? 

In what follows, I will present a rough-and-ready strategy for translating a request for data expressed in natural language into a SQL query. The strategy presented here is an outline only. But it can be generalised fairly easily. I will leave that exercise to the reader.

#### The Question/Data Request

Assuming we are using the classic Oracle [sample database](http://www.uvm.edu/~kdk/demobld.sql), take the following question as an example: 

> Get the number of employees in each job in each department in the company. Also list the department they are in, the job title, the sum of the salaries of each employee type in each department, the average salary of each employee type in each department, and show the information grouped by department name and job.<br><br>
Hint : Use sum(sal), count(*), avg(sal) and group by. 
Note : Count(*) counts the number of rows in each group as defined by the 'group by' command.
Note : Sum and Avg work the groups of rows as defined by the 'group by' comma

How do we visualise the resulting relation (table)? The short answer is, we don't, at least not at first. Instead, we break down the language of the data request into key clauses/phrases. Then, we create simple queries to get the data that corresponds to each of the clauses/phrases. Finally, we bring the separate queries together into a single query. The picture of the resulting relation (table) will gradually come into view as we work through each of the subproblems. So instead of using the language of the problem to understand the SQL query, we are turning the method on its head and using SQL queries to understand the language problem. An overview of the procedure is as follows: 

> 
- Analyse the question into clauses/phrases
- Write and test a simple query for each clause/phrase
- Combine unique SQL attribute identifiers (columns) and unique SQL clauses

Now, let's work through the problem step by step. 

---

### Step 1 - Analyse the Question/Data Request into Clauses/Phrases

Using the Oracle sample database, an analysis of the question above might look something like this, where we are asked to get: 

>
- the number of employees in each job in each department,
- the department they are in,
- their job title, 
- the sum of the salaries of each employee type in each department, 
- the average salary of each employee type in each department
- and show the information grouped by department name, and job

Next, we need to isolate the elements of these phrases/clauses that will help us to think in terms of SQL queries. For this example, we should note: 

> - the attributes of interest: number of employees, jobs, salaries, etc
- the relationship prepositions: ( *in*, *of* ) - they relate attributes to attributes and attributes to tables - and they also implying groupings
- aggregation phrases: *sum of*, *average of*
- grouping phrases: *type of*, *type in each*, and of course *grouped by* - a type is a grouping, such as type of job which groups salesman, manager, clerk and so on

Keeping these ideas in mind, we can move on to step 2, where we will write and test simple queries corresponding to the clauses/phrases we have identified in step 1. 

---

### Step 2 - Write and Test a Simple Query for each Clause/Phrase: 

Now, let's start laying out some simple queries to match those clauses/phrases. To get the number of employees in each job in each department, remember the aggregation phrases and grouping phrases. The number of employees is a __count__, and this can be expressed with the SQL `COUNT()` function, and the relationship preposition 'in', indicates a grouping because employees belong to a department, which is essentially a __group__ of employees. Note that since we are using an aggregate function in our first query, we should try using the `GROUP BY` SQL clause too as they are typically used together. So our first query will look a little like this: 

{% highlight sql %}

/* the number of employees in each job in each department */
SELECT E.DEPTNO, E.JOB, COUNT(E.JOB)
FROM EMP E
GROUP BY JOB;

{% endhighlight %}

Next, we need to get the department they are in. Note that the pronoun phrase ('they are in') links us back to the previous clause/phrase, so we should be able to use the previous SQL query as a basis for this one: 

{% highlight sql %}

/* the number of employees in each job in each department,
the department they are in 
*/
SELECT E.DEPTNO, D.DEPTNAME, E.JOB, COUNT(E.JOB)
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO
GROUP BY JOB;

{% endhighlight %}

This query requires a join because we are looking for the department they are in, which we choose to translate as the department name (`DNAME`), and `DNAME` belongs to the `DEPT` table. 

If we look at the next clause/phrase of the question, we realise that it doesn't require a separate SQL query because we have already specified the `JOB` attribute in the previous query: 

{% highlight sql %}

/* the number of employees in each job in each department,
the department they are in,
their job title 
*/
SELECT E.DEPTNO, D.DEPTNAME, E.JOB, COUNT(E.JOB)
FROM EMP E
WHERE E.DEPTNO = D.DEPTNO
GROUP BY JOB;

{% endhighlight %}

Next, we'll look at the aggregations in the following two clauses of the question. We will keep these in separate queries for now so that we can see the structure of the problem clearly: 

{% highlight sql %}

/* the sum of the salaries of each employee type in each department */
SELECT DEPTNO, SUM(SAL), JOB
FROM EMP 
GROUP BY DEPTNO, JOB;

/* the average salary of each employee type in each department */
SELECT DEPTNO, AVG(SAL), JOB
FROM EMP 
GROUP BY DEPTNO, JOB;

{% endhighlight %}

--- 

### Step 3 - Combine Unique SQL Attribute Identifiers and Unique SQL Clauses

If you have followed me this far, what should be immediately apparent now is that each of these separate simple queries, has something in common with the others, specifically attributes and SQL clauses. So we start with the `SELECT`s, and bring together the __unique__ attributes and aggregate attributes:

{% highlight sql %}

SELECT E.DEPTNO, D.DNAME, E.JOB, COUNT(E.JOB), SUM(E.SAL), AVG(E.SAL) 

{% endhighlight %}

Then, we bring together the `FROM` clauses: 

{% highlight sql %}

FROM EMP E, DEPT D

{% endhighlight %}

Finally, we return to the last clause/phrase of the original problem. Note that it specifically requires that the information be grouped by department and job. So our `GROUP BY` clause should now be easy enough to specify: 

{% highlight sql %}

GROUP BY E.DEPTNO, E.JOB;

{% endhighlight %}

The final draft of our query looks like this: 

{% highlight sql %}

SELECT E.DEPTNO, D.DNAME, E.JOB, COUNT(E.JOB), SUM(E.SAL), AVG(E.SAL)
FROM EMP E, DEPT D,
WHERE E.DEPTNO = D.DEPTNO
GROUP BY E.DEPTNO, E.JOB;

{% endhighlight %}

If we run this query, and check the question, clause/phrase by clause/phrase, against the resulting relation (table), we should be satisfied that we have answered the original question. This is because it is possible to answer this question in a few different ways. 

Now, we can visualise the table! Better still, we have a table to show the person that requested the result, and if it doesn't match their expectations, we have something to use to visualise the new problem and remove ambiguity from the conversation with that person.

### Summary

I have outlined a rough-and-ready method for breaking down a data request or exam question and translating it into a SQL query. The method departs from the idea that instead of using the language of the problem to understand the SQL query, it is easier and more intuitive to use our basic knowledge of SQL queries to understand the language of the problem. The essence of the strategy is: <br><br>
(i) analyse the sentences that comprise the question/request into clauses and/or phrases, and identify the language that nominates attributes, relationships (grouping), and aggregate attributes; <br>
(ii) write simple SQL queries to match the natural language clauses/phrases; and <br>
(iii) combine the resulting queries into a single query by combining unique SQL attribute identifiers and unique SQL clauses.<br><br>
I hope this helps!

### PostScript
If you are taking a class and you notice a difference here and there between my solution and that of your lecturer, it is because you can get the same result by constructing a query using the department number instead of the department name in the `GROUP BY` clause, and you may choose to omit the department number from your final `SELECT` statement also. In fact, there are dozens of minor variations that should result in the same table. The essence of the solution should still be the same and the resulting table should be the same!

Finally, if you find this syntax confusing, see below for a brief explanation: 

{% highlight sql %}
SELECT E.ENAME, D.DEPTNO
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO;
{% endhighlight %}

---

#### Table Aliases 

The code above uses __table aliases__ to make the syntax for table joins less ambiguous. It is analogous to using dot notation in JavaScript to refer to properties that belong to an object. ENAME is an attribute that __belongs__ to the table ENAME, whose alias is E (E.ENAME), and the attribute DEPTNO belongs to table DEPT, whose alias is D (D.DEPTNO). To tell SQL that you want to use an alias, you do so in your `FROM` clause like this:  

{% highlight sql %}
FROM EMP E
{% endhighlight %} 

or 

{% highlight sql %}
FROM EMP AS E
{% endhighlight %}

Naturally, you can specify multiple table aliases in a single `FROM` clause like so: 

{% highlight sql %}
FROM EMP E, DEPT D, CUSTOMER C
{% endhighlight %}

---