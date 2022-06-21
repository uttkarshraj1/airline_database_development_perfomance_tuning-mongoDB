# Airline Database Development Perfomance Tuning 

**General Assumptions**

1) Using timestamp for date/time is the industry standard. But since we do not have a front-end, we will use ISO just for the sake of readability.

2) We did not implement a complex id system in the DB prototype for the purpose of easier testing.

3) For more transparent testing, we only made a few flights and reservations all happening in a limited timeframe.

**Assumption about planes**

1) The planes can either be working, or going under repair, or going under upgrade. Those states cannot
overlap.

2) The date of the last upgrade of a plane will be updated only when the upgrade is over.

3) The length of service for a plane is calculated as the number of years that have passed since it was built.

4) Fields “year_of_commission” and “last_upgraded” are not required. The range given for each plane is for a full fuel load.

**Assumption about flights**


1) Because of the weather, not all flights of the same distance will take the same time.

2) The pilot and the co-pilot must be different people picked from the pool of pilots.

3) The price of the flight ticket can be different depending on the proximity to the time of flight, demand, ticket agency, etc. It is external information. We will not include it in the flight collection to avoid confusion.
All flights are direct.

4) The distance between airports might vary depending on the route the plane takes. The distance of the flight is in kilometers.


**Assumptions about arports**

1) Because the terminals might change for flights a few times before said flights, we will not store that information in this, more general, database.

2) The charge of refuel is the same for every plane.

3) When counting the charge for a plane staying at an airport, the flight will be charged for the full hour if the plane stays at the airport for more than 30 mins.

4) All the airports are inside the UK (United Kingdom), so there is no currency problem for charges.


**Assumptions about bookings**

1) all users book tickets for themselves, so we must store the passengers separately.

2) All flights booked by the same user at the same time should pertain to the same passengers.

3) Because so far, we do not have cyber security, we will not store any personal information, such as nationality or documents of passengers.

4) Only an existing user can book tickets for a journey.

**Assumptions about users**

1) We only need user email to contact them in case of emergency, no other personal information.

**Assumptions about Employees**

1) All employees hold no more than one position in the company.

2) The salary of staff is a fixed amount of money per month.

3) Fit for flight test will be valid for 3 years. Pilots can only be hired if they pass those tests regularly.

4) We assume that all pilots can drive all planes.

5) We assume that since the work is shift-based, the employees will mitigate their days-off and sick leave between themselves.

6) We assume that it will be the pilot’s job to make sure he is not overworked and always comes home.

