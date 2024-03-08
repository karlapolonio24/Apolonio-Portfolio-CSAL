function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateMatchups(conferenceTeams) {
    let matchups = [];
    for (let i = 0; i < conferenceTeams.length; i++) {
        for (let j = i + 1; j < conferenceTeams.length; j++) {
            matchups.push([conferenceTeams[i], conferenceTeams[j]], 
                [conferenceTeams[i], conferenceTeams[j]]);
            matchups.push([conferenceTeams[j], conferenceTeams[i]], 
                [conferenceTeams[j], conferenceTeams[i]]);
        }
    }
    return matchups;
}

function crossConferenceMatchups(east, west)
{
    let matchups = [];
    for (let e of east) {
        for (let w of west) {
            matchups.push([e, w], [w, e]);
        }
    }
    return matchups;
}

function createSchedule(east, west, teams) {
    let schedule = [];
    const eastMatchups = generateMatchups(east);
    const westMatchups = generateMatchups(west);
    const crossMatchups = crossConferenceMatchups(east, west);

    let allGames = eastMatchups.concat(westMatchups).concat(crossMatchups);
    shuffle(allGames);

    let scheduleDate = new Date();
    const gamesPerDay = 5;
    let restDaysTeam = {};
    teams.forEach(team => restDaysTeam[team] = 
        new Date(scheduleDate.getTime() - 86400000)); 
    // Set to 'yesterday'

    while (allGames.length > 0) {
        let dayGames = [];
        for (let i = 0; i < gamesPerDay && allGames.length > 0; i++) {
            allGames = allGames.filter(game => {
                const lastPlayedHome = restDaysTeam[game[0]];
                const lastPlayedAway = restDaysTeam[game[1]];
                if (scheduleDate > new Date(lastPlayedHome.getTime() + 86400000) 
                && scheduleDate > new Date(lastPlayedAway.getTime() + 86400000)) 
                {
                    dayGames.push(game);
                    restDaysTeam[game[0]] = new Date(scheduleDate);
                    restDaysTeam[game[1]] = new Date(scheduleDate);
                    return false;
                }
                return true;
            });
            if (dayGames.length === gamesPerDay) break;
        }

        if (dayGames.length > 0) {
            dayGames.forEach(game =>  schedule.push({ "date": new Date(scheduleDate), "matchup": game }));
        }
        scheduleDate = new Date(scheduleDate.getTime() + 86400000); // Increment day
    }

    return schedule;
}

function displaySchedule(schedule) {
    const scheduleDiv = document.getElementById("scheduleDiv");
    scheduleDiv.innerHTML = ""; // Clear existing content

    // Create a table and a header row
    const table = document.createElement("table");
    table.className = "schedule-table"; // Optional: for styling
    const headerRow = document.createElement("tr");
    const headers = ["DATE", "HOME", "VS", "AWAY"];
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Populate the table with game data
    schedule.forEach(game => {
        const dateStr = game.date.toISOString().substring(0, 10);
        const row = document.createElement("tr");

        // Date cell
        const dateCell = document.createElement("td");
        dateCell.textContent = dateStr;
        row.appendChild(dateCell);

        // Home team logo cell
        const homeLogoCell = document.createElement("td");
        const homeLogo = document.createElement("img");
        homeLogo.src = `img/${game.matchup[0].toLowerCase()}-logo.png`;
        homeLogo.alt = game.matchup[0];
        homeLogo.className = "team__logo";
        homeLogoCell.appendChild(homeLogo);
        row.appendChild(homeLogoCell);

        // VS cell
        const vsCell = document.createElement("td");
        vsCell.textContent = "VS";
        row.appendChild(vsCell);

        // Away team logo cell
        const awayLogoCell = document.createElement("td");
        const awayLogo = document.createElement("img");
        awayLogo.src = `img/${game.matchup[1].toLowerCase()}-logo.png`;
        awayLogo.alt = game.matchup[1];
        awayLogo.className = "team__logo";
        awayLogoCell.appendChild(awayLogo);
        row.appendChild(awayLogoCell);

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the scheduleDiv
    scheduleDiv.appendChild(table);
}


function generateAndDisplaySchedule() {
    const east = ["Celtics", "Heat", "Knicks", "Bulls", "Hornets"];
    const west = ["Lakers", "Mavericks", "OKC", "Warriors", "Wolves"];
    const teams = east.concat(west);
    const schedule = createSchedule(east, west, teams);
    displaySchedule(schedule);
}

document.getElementById("generateSchedule").addEventListener("click", generateAndDisplaySchedule);
