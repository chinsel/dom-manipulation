/*
Description: Added the expanded navigation variant for a/b testing. This is solely for Ticketmaster.com on desktop devices.
Technologies: ES6 Pure JavaScript, CSS, JS DOM Manipulation by appending additional navigation links and fetching dynamic data from GraphQL
Author: Chester Militante 
To test, go to https://www.ticketmaster.com and then open console and paste the entire code below.
*/

(function() {
  // similar to jQuery's delegate
  HTMLElement.prototype.delegateEvent = function(selector, event, handler) {
    this.addEventListener(event, function(e) {
      for (var target=e.target; target && target!=this; target=target.parentNode) {        
        if (target.matches(selector)) {
            handler.call(target, e);
            break;
        }
      }
    }, false);
  };
  
  // static data
  const imageConfig = "?width=72&height=72&fit=crop";
  const imageConfigSports = "?width=64&height=48&fit=crop";
  const concertsData = {
    categories: {
      heading: "TOP GENRES",
      list: [
        {
          name: "ROCK",
          link: "https://www.ticketmaster.com/discover/concerts?classificationId=KnvZfZ7vAeA&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all",
        },
        {
          name: "POP",
          link: "https://www.ticketmaster.com/discover/concerts?classificationId=KnvZfZ7vAev&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all",
        },
        {
          name: "COUNTRY",
          link: "https://www.ticketmaster.com/discover/concerts?classificationId=KnvZfZ7vAv6&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all",
        },
        {
          name: "HIP-HOP/RAP",
          link: "https://www.ticketmaster.com/discover/concerts?classificationId=KnvZfZ7vAv1&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all",
        },
        {
          name: "R&B",
          link: "https://www.ticketmaster.com/discover/concerts?classificationId=KnvZfZ7vAee&geoHash=9q5c&radius=100&sort=date%2Casc&unit=miles&daterange=all",
        }
      ],
      categoryAll: {
        name: "See All Concerts >",
        link: "https://www.ticketmaster.com/discover/concerts",
      }
    },
    subcategories: {
      heading: "POPULAR",
      list: {
        "ROCK": [],
        "POP": [],
        "COUNTRY": [],
        "HIP-HOP/RAP": [],
        "R&B": []
      }
    }
  };
  const sportsData = {
    categories: {
      heading: "LEAGUES",
      list: [
        {
          name: "NBA",
          link: "https://www.ticketmaster.com/nba",
        },
        {
          name: "NFL",
          link: "https://www.ticketmaster.com/nfl",
        },
        {
          name: "NHL",
          link: "https://www.ticketmaster.com/nhl",
        },
        {
          name: "MLB",
          link: "https://www.ticketmaster.com/mlb",
        },
        {
          name: "MLS",
          link: "https://www.ticketmaster.com/mls",
        }
      ],
      categoryAll: {
        name: "See All Sports >",
        link: "https://www.ticketmaster.com/discover/sports",
      }
    },
    subcategories: {
      heading: "TEAMS",
      list: {
        "MLB": [
          {
              name: "Arizona Diamondbacks",
              link: "https://www.ticketmaster.com/arizona-diamondbacks-tickets/artist/805895",
              image: "https://s1.ticketm.net/dam/a/08a/0c9858af-616a-44f5-874b-6aa1e964208a_1255151_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Atlanta Braves",
              link: "https://www.ticketmaster.com/atlanta-braves-tickets/artist/805896",
              image: "https://s1.ticketm.net/dam/a/951/8971a259-74a9-4412-a0f4-6c3cf9731951_899911_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Baltimore Orioles",
              link: "https://www.ticketmaster.com/baltimore-orioles-tickets/artist/805900",
              image: "https://s1.ticketm.net/dam/a/360/129004d4-88ef-468a-9be7-b443f56a0360_908231_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Boston Red Sox",
              link: "https://www.ticketmaster.com/boston-red-sox-tickets/artist/805904",
              image: "https://s1.ticketm.net/dam/a/689/680f927d-1dc7-4d44-94f9-382cd8cf3689_1255531_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago Cubs",
              link: "https://www.ticketmaster.com/chicago-cubs-tickets/artist/805915",
              image: "https://s1.ticketm.net/dam/a/34d/753fcac7-3b82-44e0-a943-b83a02db734d_1255131_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago White Sox",
              link: "https://www.ticketmaster.com/chicago-white-sox-tickets/artist/805917",
              image: "https://s1.ticketm.net/dam/a/bce/b3e596f7-e24b-4953-9729-6d13fbebebce_30191_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Cincinnati Reds",
              link: "https://www.ticketmaster.com/cincinnati-reds-tickets/artist/805919",
              image: "https://s1.ticketm.net/dam/a/006/5a7d3ee1-e3d7-4dfa-9be6-ae7a44f44006_1255511_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Cleveland Indians",
              link: "https://www.ticketmaster.com/cleveland-indians-tickets/artist/805922",
              image: "https://s1.ticketm.net/dam/a/a3b/eff23e5e-5159-4e56-a5b9-f798d393ba3b_1255301_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Colorado Rockies",
              link: "https://www.ticketmaster.com/colorado-rockies-tickets/artist/805926",
              image: "https://s1.ticketm.net/dam/a/f8e/d984dd61-12f2-434e-9a92-41ac865ccf8e_1254941_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Detroit Tigers",
              link: "https://www.ticketmaster.com/detroit-tigers-tickets/artist/805940",
              image: "https://s1.ticketm.net/dam/a/2de/ff15d8b2-a613-42a5-8040-4ecd4d8582de_1255261_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Houston Astros",
              link: "https://www.ticketmaster.com/houston-astros-tickets/artist/805948",
              image: "https://s1.ticketm.net/dam/a/140/e6d19d99-c1d0-48d6-8bbe-6296c4ef1140_1255211_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Kansas City Royals",
              link: "https://www.ticketmaster.com/kansas-city-royals-tickets/artist/805956",
              image: "https://s1.ticketm.net/dam/a/dc6/526a137a-ca56-4d2a-9c87-74305d5d2dc6_1255191_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Angels",
              link: "https://www.ticketmaster.com/los-angeles-angels-tickets/artist/805892",
              image: "https://s1.ticketm.net/dam/a/f2f/75c2f942-1de1-4fe1-9738-0382ef5c2f2f_63061_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Dodgers",
              link: "https://www.ticketmaster.com/los-angeles-dodgers-tickets/artist/805959",
              image: "https://s1.ticketm.net/dam/a/682/0785c3ee-f5f2-4300-8b93-2ba274ddb682_39351_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Miami Marlins",
              link: "https://www.ticketmaster.com/miami-marlins-tickets/artist/805944",
              image: "https://s1.ticketm.net/dam/a/7c4/4d1a0d66-800b-4cbc-95a8-cfd0095e87c4_1255101_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Milwaukee Brewers",
              link: "https://www.ticketmaster.com/milwaukee-brewers-tickets/artist/805968",
              image: "https://s1.ticketm.net/dam/a/46f/cd4a0cc8-d419-49f4-898a-464157cf546f_1255051_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Minnesota Twins",
              link: "https://www.ticketmaster.com/minnesota-twins-tickets/artist/805972",
              image: "https://s1.ticketm.net/dam/a/23a/02ae1c46-6273-44ed-b47e-d4439d59a23a_1254611_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Mets",
              link: "https://www.ticketmaster.com/new-york-mets-tickets/artist/805990",
              image: "https://s1.ticketm.net/dam/a/269/4a7e1a2f-9db4-40a5-adc6-5e5c76086269_1200561_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Yankees",
              link: "https://www.ticketmaster.com/new-york-yankees-tickets/artist/805992",
              image: "https://s1.ticketm.net/dam/a/951/8971a259-74a9-4412-a0f4-6c3cf9731951_899911_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Oakland Athletics",
              link: "https://www.ticketmaster.com/oakland-athletics-tickets/artist/805993",
              image: "https://s1.ticketm.net/dam/a/959/b4df6f39-7226-493a-ae66-3a0758514959_1254901_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Philadelphia Phillies",
              link: "https://www.ticketmaster.com/philadelphia-phillies-tickets/artist/806001",
              image: "https://s1.ticketm.net/dam/a/7c9/e2972f63-742d-4d7d-a253-f60be9d4b7c9_1254551_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Pittsburgh Pirates",
              link: "https://www.ticketmaster.com/pittsburgh-pirates-tickets/artist/806006",
              image: "https://s1.ticketm.net/dam/a/36b/b7aacc68-1b6a-4a0a-81ba-8dcc23d8636b_1254821_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Diego Padres",
              link: "https://www.ticketmaster.com/san-diego-padres-tickets/artist/806014",
              image: "https://s1.ticketm.net/dam/a/f27/483b4e4e-dd40-4e51-a134-47d9ae806f27_1281621_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Francisco Giants",
              link: "https://www.ticketmaster.com/san-francisco-giants-tickets/artist/806016",
              image: "https://s1.ticketm.net/dam/a/036/e57f6fe4-4657-4bb2-a387-b24e523a3036_1254761_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Seattle Mariners",
              link: "https://www.ticketmaster.com/seattle-mariners-tickets/artist/806019",
              image: "https://s1.ticketm.net/dam/a/19f/9b0a66b8-a8c9-4f29-9c15-73e19f88a19f_1255361_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "St. Louis Cardinals",
              link: "https://www.ticketmaster.com/st-louis-cardinals-tickets/artist/806023",
              image: "https://s1.ticketm.net/dam/a/91a/61c843f5-1eb0-4896-9def-afa4afaa291a_1254691_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Tampa Bay Rays",
              link: "https://www.ticketmaster.com/tampa-bay-rays-tickets/artist/806027",
              image: "https://s1.ticketm.net/dam/a/74d/c920b658-29a6-4237-bbd3-726366e5d74d_1254871_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Texas Rangers",
              link: "https://www.ticketmaster.com/texas-rangers-tickets/artist/806031",
              image: "https://s1.ticketm.net/dam/a/67d/7b495c11-d0ed-4f6e-b27b-607af108667d_30141_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Toronto Blue Jays",
              link: "https://www.ticketmaster.com/toronto-blue-jays-tickets/artist/806032",
              image: "https://s1.ticketm.net/dam/a/756/614cdd14-cb4a-4aff-a406-d51a959a5756_104481_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Washington Nationals",
              link: "https://www.ticketmaster.com/washington-nationals-tickets/artist/948674",
              image: "https://s1.ticketm.net/dam/a/1c8/66e1f574-ebb1-4d65-93f3-0b1a8bc4e1c8_1254531_CUSTOM.jpg" + imageConfigSports
          }
      ],
      "NFL": [
          {
              name: "Arizona Cardinals",
              link: "https://www.ticketmaster.com/arizona-cardinals-tickets/artist/805894",
              image: "https://s1.ticketm.net/dam/a/e8f/768d115a-e25f-44ec-b5ac-a8040ca84e8f_549491_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Atlanta Falcons",
              link: "https://www.ticketmaster.com/atlanta-falcons-tickets/artist/805897",
              image: "https://s1.ticketm.net/dam/a/7d6/2d40bd88-e619-442a-91a3-9009f0bad7d6_549501_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Baltimore Ravens",
              link: "https://www.ticketmaster.com/baltimore-ravens-tickets/artist/805901",
              image: "https://s1.ticketm.net/dam/a/c54/fbcd527c-cf7a-4403-a2b1-c2962839ac54_549511_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Buffalo Bills",
              link: "https://www.ticketmaster.com/buffalo-bills-tickets/artist/805905",
              image: "https://s1.ticketm.net/dam/a/40a/59338656-529a-42d1-936a-c3904d45140a_549521_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Carolina Panthers",
              link: "https://www.ticketmaster.com/carolina-panthers-tickets/artist/805909",
              image: "https://s1.ticketm.net/dam/a/1b6/0583a032-fb89-4026-b655-c8e70209d1b6_549531_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago Bears",
              link: "https://www.ticketmaster.com/chicago-bears-tickets/artist/805912",
              image: "https://s1.ticketm.net/dam/a/400/470d7896-ad7e-4cc4-a527-77c53934d400_549541_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Cincinnati Bengals",
              link: "https://www.ticketmaster.com/cincinnati-bengals-tickets/artist/805918",
              image: "https://s1.ticketm.net/dam/a/f2b/9fcb4bb2-c480-4b89-8ede-e7626e6c8f2b_712391_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Cleveland Browns",
              link: "https://www.ticketmaster.com/cleveland-browns-tickets/artist/805920",
              image: "https://s1.ticketm.net/dam/a/c11/d6b7ad8b-c5fe-4a1e-b204-539f847aac11_549561_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Dallas Cowboys",
              link: "https://www.ticketmaster.com/dallas-cowboys-tickets/artist/805931",
              image: "https://s1.ticketm.net/dam/a/1ba/522a6d18-d42a-4cbd-a716-e763e5d261ba_549571_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Denver Broncos",
              link: "https://www.ticketmaster.com/denver-broncos-tickets/artist/805934",
              image: "https://s1.ticketm.net/dam/a/9d0/a69f7b7c-ad15-4689-9d50-c83040d8b9d0_206531_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Detroit Lions",
              link: "https://www.ticketmaster.com/detroit-lions-tickets/artist/805936",
              image: "https://s1.ticketm.net/dam/a/6df/bd4278eb-e2fa-4dd9-95cc-5190f6b166df_685621_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Green Bay Packers",
              link: "https://www.ticketmaster.com/green-bay-packers-tickets/artist/805947",
              image: "https://s1.ticketm.net/dam/a/c5c/70c410ba-e96c-47b0-bf6d-64a153e78c5c_549581_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Houston Texans",
              link: "https://www.ticketmaster.com/houston-texans-tickets/artist/821630",
              image: "https://s1.ticketm.net/dam/a/045/692c1ead-210f-44bd-b73b-b450642e4045_549591_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Indianapolis Colts",
              link: "https://www.ticketmaster.com/indianapolis-colts-tickets/artist/805953",
              image: "https://s1.ticketm.net/dam/a/c13/e289b52f-6ab6-4978-8583-31cfe30bfc13_549601_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Jacksonville Jaguars",
              link: "https://www.ticketmaster.com/jacksonville-jaguars-tickets/artist/805954",
              image: "https://s1.ticketm.net/dam/a/286/34aefea8-86f0-48cd-a2bb-acb7fd636286_1080841_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Kansas City Chiefs",
              link: "https://www.ticketmaster.com/kansas-city-chiefs-tickets/artist/805955",
              image: "https://s1.ticketm.net/dam/a/2ab/995c8745-1c4f-4e08-89b8-d81e1f7ee2ab_549621_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Las Vegas Raiders",
              link: "https://www.ticketmaster.com/las-vegas-raiders-tickets/artist/805994",
              image: "https://s1.ticketm.net/dam/a/3be/19795940-b1d0-4be9-a695-95352b9b33be_549691_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Chargers",
              link: "https://www.ticketmaster.com/los-angeles-chargers-tickets/artist/806013",
              image: "https://s1.ticketm.net/dam/a/d31/60eca3fb-c0f0-4ab3-99d2-aec0c4958d31_549631_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Rams",
              link: "https://www.ticketmaster.com/los-angeles-rams-tickets/artist/806024",
              image: "https://s1.ticketm.net/dam/a/c23/579f1f83-7f8b-4389-ab9f-e10ad244bc23_618111_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Miami Dolphins",
              link: "https://www.ticketmaster.com/miami-dolphins-tickets/artist/805964",
              image: "https://s1.ticketm.net/dam/a/bba/6d059c3f-56ea-4d88-bbf9-deffc1c68bba_790571_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Minnesota Vikings",
              link: "https://www.ticketmaster.com/minnesota-vikings-tickets/artist/805973",
              image: "https://s1.ticketm.net/dam/a/60c/0e0df7fd-9f01-4538-b4e4-e7d7d287460c_685631_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New England Patriots",
              link: "https://www.ticketmaster.com/new-england-patriots-tickets/artist/805980",
              image: "https://s1.ticketm.net/dam/a/e5b/5986b68f-9f93-4faa-b781-2f88e2e9fe5b_549661_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New Orleans Saints",
              link: "https://www.ticketmaster.com/new-orleans-saints-tickets/artist/805984",
              image: "https://s1.ticketm.net/dam/a/7b3/945bb1aa-ae91-4218-b278-794e901957b3_582441_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Giants",
              link: "https://www.ticketmaster.com/new-york-giants-tickets/artist/805985",
              image: "https://s1.ticketm.net/dam/a/29b/0e1d4726-b7fc-4ca6-a5f1-f59581ae229b_549671_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Jets",
              link: "https://www.ticketmaster.com/new-york-jets-tickets/artist/805987",
              image: "https://s1.ticketm.net/dam/a/9d9/fdca1f1b-647c-4fdc-b142-f8adaf2c29d9_1019581_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Philadelphia Eagles",
              link: "https://www.ticketmaster.com/philadelphia-eagles-tickets/artist/805999",
              image: "https://s1.ticketm.net/dam/a/a83/30e9806d-3613-4cd0-807e-14e8f36aba83_549701_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Pittsburgh Steelers",
              link: "https://www.ticketmaster.com/pittsburgh-steelers-tickets/artist/806007",
              image: "https://s1.ticketm.net/dam/a/f68/43d569a9-e0ac-4f0e-89d2-0feeb768cf68_549711_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Francisco 49ers",
              link: "https://www.ticketmaster.com/san-francisco-49ers-tickets/artist/806015",
              image: "https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Seattle Seahawks",
              link: "https://www.ticketmaster.com/seattle-seahawks-tickets/artist/806020",
              image: "https://s1.ticketm.net/dam/a/7ef/0e94936b-1d04-4448-b1d3-cc375102e7ef_549731_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Tampa Bay Buccaneers",
              link: "https://www.ticketmaster.com/tampa-bay-buccaneers-tickets/artist/806026",
              image: "https://s1.ticketm.net/dam/a/a5a/fe57a3e8-e939-4692-ab24-631e9c3c7a5a_549741_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Tennessee Titans",
              link: "https://www.ticketmaster.com/tennessee-titans-tickets/artist/806030",
              image: "https://s1.ticketm.net/dam/a/e91/43052f7b-c97a-442b-95bd-5b458e855e91_549751_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Washington Redskins",
              link: "https://www.ticketmaster.com/washington-redskins-tickets/artist/806041",
              image: "https://s1.ticketm.net/dam/a/401/ae58b6fb-50f3-4f95-bf55-2d9e22d3f401_549761_CUSTOM.jpg" + imageConfigSports
          }
      ],
      "NHL": [
          {
              name: "Anaheim Ducks",
              link: "https://www.ticketmaster.com/anaheim-ducks-tickets/artist/805893",
              image: "https://s1.ticketm.net/dam/a/706/8491259e-fe68-4f45-9f54-f2bf16ca1706_1277291_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Arizona Coyotes",
              link: "https://www.ticketmaster.com/arizona-coyotes-tickets/artist/806002",
              image: "https://s1.ticketm.net/dam/a/f50/43f44202-a132-4fe7-bc06-f377a635af50_1277321_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Boston Bruins",
              link: "https://www.ticketmaster.com/boston-bruins-tickets/artist/805902",
              image: "https://s1.ticketm.net/dam/a/9b4/56b40e80-2590-4dce-bd0b-90b4a96119b4_1277311_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Buffalo Sabres",
              link: "https://www.ticketmaster.com/buffalo-sabres-tickets/artist/805906",
              image: "https://s1.ticketm.net/dam/a/341/133efa61-c370-4fbd-a2bc-acff6aadb341_1254721_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Calgary Flames",
              link: "https://www.ticketmaster.com/calgary-flames-tickets/artist/805907",
              image: "https://s1.ticketm.net/dam/a/650/06119c08-e14b-4ff8-aad6-2a76930bf650_1277341_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Carolina Hurricanes",
              link: "https://www.ticketmaster.com/carolina-hurricanes-tickets/artist/805908",
              image: "https://s1.ticketm.net/dam/a/0a6/1a8879f7-58c5-415d-a6a4-8c9a794970a6_1277361_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago Blackhawks",
              link: "https://www.ticketmaster.com/chicago-blackhawks-tickets/artist/805913",
              image: "https://s1.ticketm.net/dam/a/086/700ab6d7-af21-4012-a38d-51f876a9b086_1277281_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Colorado Avalanche",
              link: "https://www.ticketmaster.com/colorado-avalanche-tickets/artist/805924",
              image: "https://s1.ticketm.net/dam/a/135/c5d126e4-4871-4bc2-acd3-c98acf78d135_1277401_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Columbus Blue Jackets",
              link: "https://www.ticketmaster.com/columbus-blue-jackets-tickets/artist/805927",
              image: "https://s1.ticketm.net/dam/a/5fa/dc579651-afb4-4231-9371-4e6f4f1595fa_1277411_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Dallas Stars",
              link: "https://www.ticketmaster.com/dallas-stars-tickets/artist/805933",
              image: "https://s1.ticketm.net/dam/a/591/6d5a8797-3670-404e-9b27-7ba5b4bcc591_1277201_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Detroit Red Wings",
              link: "https://www.ticketmaster.com/detroit-red-wings-tickets/artist/805938",
              image: "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Edmonton Oilers",
              link: "https://www.ticketmaster.com/edmonton-oilers-tickets/artist/805943",
              image: "https://s1.ticketm.net/dam/a/fc6/7f086b40-3c4e-4fdc-b98d-a4e599c13fc6_1277301_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Florida Panthers",
              link: "https://www.ticketmaster.com/florida-panthers-tickets/artist/805945",
              image: "https://s1.ticketm.net/dam/a/3b1/c0517026-e94f-445e-ad19-7c92571e13b1_1277221_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Kings",
              link: "https://www.ticketmaster.com/los-angeles-kings-tickets/artist/805961",
              image: "https://s1.ticketm.net/dam/a/1a3/2aa92b52-6ecd-441f-bd55-60b834c7e1a3_1254681_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Minnesota Wild",
              link: "https://www.ticketmaster.com/minnesota-wild-tickets/artist/805974",
              image: "https://s1.ticketm.net/dam/a/0bb/4a437357-2478-48e0-b33b-2527f62c40bb_1277331_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Montreal Canadiens",
              link: "https://www.ticketmaster.com/montreal-canadiens-tickets/artist/805975",
              image: "https://s1.ticketm.net/dam/a/14c/b2e25e2b-d949-476d-b3bd-c33721c6414c_1277261_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Nashville Predators",
              link: "https://www.ticketmaster.com/nashville-predators-tickets/artist/805978",
              image: "https://s1.ticketm.net/dam/a/40c/57296786-9252-42bf-a3b3-ec376f7ff40c_1277271_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New Jersey Devils",
              link: "https://www.ticketmaster.com/new-jersey-devils-tickets/artist/805982",
              image: "https://s1.ticketm.net/dam/a/e40/87c41347-08cf-4894-b7d1-95155a61fe40_1277381_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Islanders",
              link: "https://www.ticketmaster.com/new-york-islanders-tickets/artist/805986",
              image: "https://s1.ticketm.net/dam/a/be7/41de5270-2c83-4201-8318-3c566416fbe7_1277351_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Rangers",
              link: "https://www.ticketmaster.com/new-york-rangers-tickets/artist/805991",
              image: "https://s1.ticketm.net/dam/a/1b9/856d29cb-41e0-494f-ba69-09714e9e51b9_1277391_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Ottawa Senators",
              link: "https://www.ticketmaster.com/ottawa-senators-tickets/artist/805997",
              image: "https://s1.ticketm.net/dam/a/edc/f9fa0c19-a4da-41fa-910d-2c04defffedc_1277441_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Philadelphia Flyers",
              link: "https://www.ticketmaster.com/philadelphia-flyers-tickets/artist/806000",
              image: "https://s1.ticketm.net/dam/a/d4a/f60ad2df-553d-4158-9109-0d713be71d4a_1254751_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Pittsburgh Penguins",
              link: "https://www.ticketmaster.com/pittsburgh-penguins-tickets/artist/806005",
              image: "https://s1.ticketm.net/dam/a/441/727091bb-bf5a-4b47-ba58-c8981468c441_1277421_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Jose Sharks",
              link: "https://www.ticketmaster.com/san-jose-sharks-tickets/artist/806018",
              image: "https://s1.ticketm.net/dam/a/b2d/1360aaad-4f3b-4242-8f56-9889e9d3db2d_1277191_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "St. Louis Blues",
              link: "https://www.ticketmaster.com/st-louis-blues-tickets/artist/806025",
              image: "https://s1.ticketm.net/dam/a/24c/83645078-6ec0-49d0-8776-5012ee8d224c_1277231_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Tampa Bay Lightning",
              link: "https://www.ticketmaster.com/tampa-bay-lightning-tickets/artist/806028",
              image: "https://s1.ticketm.net/dam/a/a61/147f5868-d179-408f-8484-8deb775e2a61_1277211_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Toronto Maple Leafs",
              link: "https://www.ticketmaster.com/toronto-maple-leafs-tickets/artist/806033",
              image: "https://s1.ticketm.net/dam/a/2d9/2f921db0-3766-4ceb-b1a8-597b8cc672d9_1277181_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Vancouver Canucks",
              link: "https://www.ticketmaster.com/vancouver-canucks-tickets/artist/806037",
              image: "https://s1.ticketm.net/dam/a/33e/6d629753-e609-4bc2-b8f2-5ed321ccb33e_1277151_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Vegas Golden Knights",
              link: "https://www.ticketmaster.com/vegas-golden-knights-tickets/artist/2386258",
              image: "https://s1.ticketm.net/dam/a/f5d/a102b982-759b-4cd4-aeb6-ed66453daf5d_1254801_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Washington Capitals",
              link: "https://www.ticketmaster.com/washington-capitals-tickets/artist/806039",
              image: "https://s1.ticketm.net/dam/a/92d/401576b6-8ef1-4aac-8dbe-0cf18f42492d_1277141_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Winnipeg Jets",
              link: "https://www.ticketmaster.com/winnipeg-jets-tickets/artist/1613893",
              image: "https://s1.ticketm.net/dam/a/bcd/43234671-e48b-472d-9549-88f16e658bcd_1277131_CUSTOM.jpg" + imageConfigSports
          }
      ],
      "NBA": [
          {
              name: "Atlanta Hawks",
              link: "https://www.ticketmaster.com/atlanta-hawks-tickets/artist/805898",
              image: "https://s1.ticketm.net/dam/a/478/e03cbcd0-152d-40a9-b101-a6cc15a2d478_89831_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Boston Celtics",
              link: "https://www.ticketmaster.com/boston-celtics-tickets/artist/805903",
              image: "https://s1.ticketm.net/dam/a/8d4/8d941ea2-4a9b-4f7e-80e4-ac8984b528d4_238861_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Brooklyn Nets",
              link: "https://www.ticketmaster.com/brooklyn-nets-tickets/artist/805983",
              image: "https://s1.ticketm.net/dam/a/3c3/aafab26b-70a8-474d-bbe5-6918cbea63c3_1103711_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Charlotte Hornets",
              link: "https://www.ticketmaster.com/charlotte-hornets-tickets/artist/931493",
              image: "https://s1.ticketm.net/dam/a/949/a7d02c0d-d3c5-4c48-ba09-8fd44ee3d949_1043081_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago Bulls",
              link: "https://www.ticketmaster.com/chicago-bulls-tickets/artist/805914",
              image: "https://s1.ticketm.net/dam/a/4c7/8b8c3cf9-a216-40c8-8b41-b55b540004c7_28951_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Cleveland Cavaliers",
              link: "https://www.ticketmaster.com/cleveland-cavaliers-tickets/artist/805921",
              image: "https://s1.ticketm.net/dam/a/fbf/e8b7d698-44e8-46a7-b061-9e04847f0fbf_1254571_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Dallas Mavericks",
              link: "https://www.ticketmaster.com/dallas-mavericks-tickets/artist/805932",
              image: "https://s1.ticketm.net/dam/a/af3/57b73d7e-2f19-4a3a-9424-91d82a692af3_170171_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Denver Nuggets",
              link: "https://www.ticketmaster.com/denver-nuggets-tickets/artist/805935",
              image: "https://s1.ticketm.net/dam/a/ba1/5ff27d6f-da5f-4fd2-8c6f-ad59b82afba1_1105351_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Detroit Pistons",
              link: "https://www.ticketmaster.com/detroit-pistons-tickets/artist/805937",
              image: "https://s1.ticketm.net/dam/a/d6c/5e920228-27cd-4cbb-80b1-eee6215ffd6c_417241_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Golden State Warriors",
              link: "https://www.ticketmaster.com/golden-state-warriors-tickets/artist/805946",
              image: "https://s1.ticketm.net/dam/a/e09/b180f6e8-0ff8-4ee2-81ea-a12ec55abe09_1113501_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Houston Rockets",
              link: "https://www.ticketmaster.com/houston-rockets-tickets/artist/805950",
              image: "https://s1.ticketm.net/dam/a/643/7b3286a2-655d-4f93-a852-66fc49a2a643_1254521_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Indiana Pacers",
              link: "https://www.ticketmaster.com/indiana-pacers-tickets/artist/805952",
              image: "https://s1.ticketm.net/dam/a/f12/a62c4033-aea5-46f9-ae66-387381441f12_1126481_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "LA Clippers",
              link: "https://www.ticketmaster.com/la-clippers-tickets/artist/805958",
              image: "https://s1.ticketm.net/dam/a/159/9c88417d-48b3-4d51-a6de-65762caeb159_1254621_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Lakers",
              link: "https://www.ticketmaster.com/los-angeles-lakers-tickets/artist/805962",
              image: "https://s1.ticketm.net/dam/a/441/6c483401-d57c-41b7-aee7-bb94e5b58441_29091_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Memphis Grizzlies",
              link: "https://www.ticketmaster.com/memphis-grizzlies-tickets/artist/806038",
              image: "https://s1.ticketm.net/dam/a/57d/12c0d0a6-5d62-4c05-bb97-05dae6b8157d_864201_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Miami Heat",
              link: "https://www.ticketmaster.com/miami-heat-tickets/artist/805966",
              image: "https://s1.ticketm.net/dam/a/29e/08af8650-5b69-4c79-b56e-a4545098b29e_29011_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Milwaukee Bucks",
              link: "https://www.ticketmaster.com/milwaukee-bucks-tickets/artist/805969",
              image: "https://s1.ticketm.net/dam/a/b44/d4ed1ef5-89c2-403f-8684-2e7ac5e81b44_28941_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Minnesota Timberwolves",
              link: "https://www.ticketmaster.com/minnesota-timberwolves-tickets/artist/805971",
              image: "https://s1.ticketm.net/dam/a/0ea/7eda97ee-637f-4adb-b7b4-bf95732e80ea_1254581_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New Orleans Pelicans",
              link: "https://www.ticketmaster.com/new-orleans-pelicans-tickets/artist/805910",
              image: "https://s1.ticketm.net/dam/a/882/f97eca92-0499-4d34-8cc6-c0a8c7814882_1254631_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Knicks",
              link: "https://www.ticketmaster.com/new-york-knicks-tickets/artist/805988",
              image: "https://s1.ticketm.net/dam/a/e72/a1498932-2e83-4033-acdb-2c9024885e72_485461_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Oklahoma City Thunder",
              link: "https://www.ticketmaster.com/oklahoma-city-thunder-tickets/artist/1250512",
              image: "https://s1.ticketm.net/dam/a/b63/b26ef102-70cb-40a2-8e1f-3efe8f03ab63_29241_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Orlando Magic",
              link: "https://www.ticketmaster.com/orlando-magic-tickets/artist/805995",
              image: "https://s1.ticketm.net/dam/a/084/d6561be7-919e-4228-a5e1-8edc07cf6084_29111_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Philadelphia 76ers",
              link: "https://www.ticketmaster.com/philadelphia-76ers-tickets/artist/805998",
              image: "https://s1.ticketm.net/dam/a/b07/52021eae-49ac-43d2-9e5a-66ddddab7b07_1254601_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Phoenix Suns",
              link: "https://www.ticketmaster.com/phoenix-suns-tickets/artist/806004",
              image: "https://s1.ticketm.net/dam/a/021/705fdac6-22ce-441c-9f76-5bddf586b021_779401_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Portland Trail Blazers",
              link: "https://www.ticketmaster.com/portland-trail-blazers-tickets/artist/806009",
              image: "https://s1.ticketm.net/dam/a/f6f/b64b32ce-dbfb-4231-afc0-1f56ac078f6f_1154781_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Sacramento Kings",
              link: "https://www.ticketmaster.com/sacramento-kings-tickets/artist/806010",
              image: "https://s1.ticketm.net/dam/a/c95/09e42d6b-15aa-4a2c-92b1-dad02397ac95_81111_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Antonio Spurs",
              link: "https://www.ticketmaster.com/san-antonio-spurs-tickets/artist/806012",
              image: "https://s1.ticketm.net/dam/a/06c/3da037f9-d27d-4620-b2b1-89c2150e706c_29221_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Toronto Raptors",
              link: "https://www.ticketmaster.com/toronto-raptors-tickets/artist/806034",
              image: "https://s1.ticketm.net/dam/a/0d2/b6e4c3ae-7c1c-4ad3-a3c5-461c8789f0d2_1077301_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Utah Jazz",
              link: "https://www.ticketmaster.com/utah-jazz-tickets/artist/806035",
              image: "https://s1.ticketm.net/dam/a/e4c/943fb984-7844-4e82-b0cd-176a58921e4c_483271_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Washington Wizards",
              link: "https://www.ticketmaster.com/washington-wizards-tickets/artist/806042",
              image: "https://s1.ticketm.net/dam/a/76b/c64e0956-c0ed-42f8-b08b-16c3778bb76b_1186481_CUSTOM.jpg" + imageConfigSports
          }
      ],
      "MLS": [
          {
              name: "Atlanta United FC",
              link: "https://www.ticketmaster.com/atlanta-united-fc-tickets/artist/2213124",
              image: "https://s1.ticketm.net/dam/a/9d4/1bb7c0c3-9015-4d51-a3b3-5eca68b2d9d4_1286301_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Chicago Fire FC",
              link: "https://www.ticketmaster.com/chicago-fire-fc-tickets/artist/805916",
              image: "https://s1.ticketm.net/dam/a/851/8c4c3282-5ef0-4f8a-9e40-45ce82976851_1261981_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Colorado Rapids",
              link: "https://www.ticketmaster.com/colorado-rapids-tickets/artist/805925",
              image: "https://s1.ticketm.net/dam/a/3ea/293b4423-8401-4fc4-b534-faf8ad9413ea_1284671_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Columbus Crew SC",
              link: "https://www.ticketmaster.com/columbus-crew-sc-tickets/artist/805928",
              image: "https://s1.ticketm.net/dam/a/019/6b3b10d5-2f1d-411c-b51e-f4b4f8352019_28711_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "D.C. United",
              link: "https://www.ticketmaster.com/dc-united-tickets/artist/806390",
              image: "https://s1.ticketm.net/dam/a/a33/877cadf9-d40d-4f2e-ba4a-d0a5a71aca33_750511_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "FC Cincinnati",
              link: "https://www.ticketmaster.com/fc-cincinnati-tickets/artist/2427786",
              image: "https://s1.ticketm.net/dam/a/6b8/b49d0a70-b13a-473a-a084-97a82cfcb6b8_1254981_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "FC Dallas",
              link: "https://www.ticketmaster.com/fc-dallas-tickets/artist/805930",
              image: "https://s1.ticketm.net/dam/a/23f/1b2b5b61-a11a-4bb8-af62-2a262050023f_1254861_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Houston Dynamo",
              link: "https://www.ticketmaster.com/houston-dynamo-tickets/artist/1017951",
              image: "https://s1.ticketm.net/dam/a/d96/2fcc6a13-708b-43ae-9dc0-3e41a1217d96_1255501_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Inter Miami CF",
              link: "https://www.ticketmaster.com/inter-miami-cf-tickets/artist/2641625",
              image: "https://s1.ticketm.net/dam/a/776/fc70fc96-5f7d-4cf5-8c3c-ee407ce94776_1045911_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "LA Galaxy",
              link: "https://www.ticketmaster.com/la-galaxy-tickets/artist/805960",
              image: "https://s1.ticketm.net/dam/a/b89/4063f27e-e430-4cf5-a41d-d06e0eb07b89_1255221_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Los Angeles Football Club",
              link: "https://www.ticketmaster.com/los-angeles-football-club-tickets/artist/2451856",
              image: "https://s1.ticketm.net/dam/a/af5/63dc84c0-8c5b-4462-9645-106b7a810af5_966791_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Minnesota United FC",
              link: "https://www.ticketmaster.com/minnesota-united-fc-tickets/artist/1501648",
              image: "https://s1.ticketm.net/dam/a/6a2/bddd6ce6-de99-4e2f-8fac-4e905b5aa6a2_1255461_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Montreal Impact",
              link: "https://www.ticketmaster.com/montreal-impact-tickets/artist/806614",
              image: "https://s1.ticketm.net/dam/a/45e/b48321cc-f238-409c-828f-0c62c68f045e_1255381_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Nashville SC",
              link: "https://www.ticketmaster.com/nashville-sc-tickets/artist/2452438",
              image: "https://s1.ticketm.net/dam/a/a56/ef58b8fa-af11-4ce9-9c21-5f9580ad4a56_1248641_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New England Revolution",
              link: "https://www.ticketmaster.com/new-england-revolution-tickets/artist/805981",
              image: "https://s1.ticketm.net/dam/a/fe8/df20017e-5df3-4d4c-9403-9e8d7f6edfe8_468001_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York City FC",
              link: "https://www.ticketmaster.com/new-york-city-fc-tickets/artist/1991293",
              image: "https://s1.ticketm.net/dam/a/325/4011cc9c-eb4d-4c31-8ca7-4010e9ce1325_436791_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "New York Red Bulls",
              link: "https://www.ticketmaster.com/new-york-red-bulls-tickets/artist/806601",
              image: "https://s1.ticketm.net/dam/a/4e4/cf1cf29f-365d-494e-b8ce-210bd05a24e4_946981_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Orlando City SC",
              link: "https://www.ticketmaster.com/orlando-city-sc-tickets/artist/1550331",
              image: "https://s1.ticketm.net/dam/a/60f/b02dc29f-4c2c-4922-b057-6b38edb3c60f_925321_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Philadelphia Union",
              link: "https://www.ticketmaster.com/philadelphia-union-tickets/artist/1418418",
              image: "https://s1.ticketm.net/dam/a/e06/d99563f3-915a-4941-9592-3f908f223e06_1255451_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Portland Timbers",
              link: "https://www.ticketmaster.com/portland-timbers-tickets/artist/806820",
              image: "https://s1.ticketm.net/dam/a/8d1/8acc22fc-9b6e-4752-b475-0d76bad738d1_1255121_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Real Salt Lake",
              link: "https://www.ticketmaster.com/real-salt-lake-tickets/artist/959263",
              image: "https://s1.ticketm.net/dam/a/b0b/2bed69e4-a2b2-4c4c-b8f4-8d5da6567b0b_1255201_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "San Jose Earthquakes",
              link: "https://www.ticketmaster.com/san-jose-earthquakes-tickets/artist/806017",
              image: "https://s1.ticketm.net/dam/a/050/7d032013-88f0-40fb-aaa1-bec11824b050_1107391_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Seattle Sounders FC",
              link: "https://www.ticketmaster.com/seattle-sounders-fc-tickets/artist/1292961",
              image: "https://s1.ticketm.net/dam/a/22f/ee253761-968f-48ea-8347-4875df42022f_1255311_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Sporting Kansas City",
              link: "https://www.ticketmaster.com/sporting-kansas-city-tickets/artist/805957",
              image: "https://s1.ticketm.net/dam/a/ca4/793435af-8eab-4969-ba5d-3c8baca03ca4_1255271_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Toronto FC",
              link: "https://www.ticketmaster.com/toronto-fc-tickets/artist/1110670",
              image: "https://s1.ticketm.net/dam/a/e80/2a53e000-cab3-4707-a381-9063b8cf0e80_919461_CUSTOM.jpg" + imageConfigSports
          },
          {
              name: "Vancouver Whitecaps FC",
              link: "https://www.ticketmaster.com/vancouver-whitecaps-fc-tickets/artist/821721",
              image: "https://s1.ticketm.net/dam/a/a6a/bcd77fd9-ae98-46b1-8ced-43a548df4a6a_28901_CUSTOM.jpg" + imageConfigSports
          }
      ]
    } 
    },
    sidecategories: {
      heading: "Popular Events",
      list: [
        {
          name: "March Madness",
          link: "https://www.ticketmaster.com/marchmadness",
        },
        {
          name: "US Open",
          link: "https://www.ticketmaster.com/usopentennis",
        },
        {
          name: "Kentucky Derby",
          link: "https://www.ticketmaster.com/kentuckyderby",
        }
      ]
    }
  };

  const artsData = {
    categories: {
      heading: "Entertainment Guides",
      list: [
        {
          name: "Broadway",
          link: "https://in.ticketmaster.com/broadway/"
        },
        {
          name: "Broadway On Tour",
          link: "https://in.ticketmaster.com/broadway-tours/"
        },
        {
          name: "Off-Broadway",
          link: "https://in.ticketmaster.com/off-broadway/"
        },
        {
          name: "Las Vegas",
          link: "https://in.ticketmaster.com/lasvegas/"
        },
        {
          name: "Cirque du Soleil",
          link: "https://in.ticketmaster.com/cirque-du-soleil/"
        },
      ],  
      categoryAll: {
        name: "See All Arts & Theater >",
        link: "https://www.ticketmaster.com/discover/arts-theater",
      } 
    }, 
    subcategories: {
      heading: "POPULAR",
      list: []
    }
  };

  const familyData = {
    categories: {
      heading: "POPULAR",
      list: []
    },
    subcategories: {
      heading: "POPULAR",
      list: [],
      categoryAll: {
        name: "See All Family >",
        link: "https://www.ticketmaster.com/discover/family",
      }
    }
  };

  const moreData = {
    categories: {
      heading: "Explore",
      list: [],
    },
    subcategories: {
      heading: "CITY GUIDES",
      list: [ 
        {
          name: "Atlanta, GA",
          link: "https://www.ticketmaster.com/discover/concerts/atlanta",
        },
        {
          name: "Baltimore, MD",
          link: "https://www.ticketmaster.com/discover/concerts/baltimore",
        },
        {
          name: "Boston, MA",
          link: "https://www.ticketmaster.com/discover/concerts/boston",
        },
        {
          name: "Chicago, IL",
          link: "https://www.ticketmaster.com/discover/concerts/chicago",
        },
        {
          name: "Dallas, TX",
          link: "https://www.ticketmaster.com/discover/concerts/dallas",
        },
        {
          name: "Denver, CO",
          link: "https://www.ticketmaster.com/discover/concerts/denver",
        },
        {
          name: "Detroit, MI",
          link: "https://www.ticketmaster.com/discover/concerts/detroit",
        },
        {
          name: "Fort Worth, TX",
          link: "https://www.ticketmaster.com/discover/concerts/fort-worth",
        },
        {
          name: "Houston, TX",
          link: "https://www.ticketmaster.com/discover/concerts/houston",
        },
        {
          name: "Las Vegas, NV",
          link: "https://www.ticketmaster.com/discover/concerts/las-vegas",
        },
        {
          name: "Los Angeles, CA",
          link: "https://www.ticketmaster.com/discover/concerts/los-angeles",
        },
        {
          name: "Nashville, TN",
          link: "https://www.ticketmaster.com/discover/concerts/nashville",
        },
        {
          name: "New York, NY",
          link: "https://www.ticketmaster.com/discover/concerts/new-york",
        },
        {
          name: "Newark, NJ",
          link: "https://www.ticketmaster.com/discover/concerts/newark",
        },
        {
          name: "Philadelphia, PA",
          link: "https://www.ticketmaster.com/discover/concerts/philadelphia",
        },
        {
          name: "Phoenix, AZ",
          link: "https://www.ticketmaster.com/discover/concerts/phoenix",
        },
        {
          name: "Portland, OR",
          link: "https://www.ticketmaster.com/discover/concerts/portland",
        },
        {
          name: "San Diego, CA",
          link: "https://www.ticketmaster.com/discover/concerts/san-diego",
        },
        {
          name: "San Francisco, CA",
          link: "https://www.ticketmaster.com/discover/concerts/san-francisco",
        },
        { 
          name: "Scottsdale, AZ",
          link: "https://www.ticketmaster.com/discover/concerts/scottsdale",
        },
        {
          name: "Seattle, WA",
          link: "https://www.ticketmaster.com/discover/concerts/seattle",
        },
        {
          name: "St. Louis, MO",
          link: "https://www.ticketmaster.com/discover/concerts/saint-louis",
        },
        {
          name: "Tacoma, WA",
          link: "https://www.ticketmaster.com/discover/concerts/tacoma",
        },
        {
          name: "Washington, DC",
          link: "https://www.ticketmaster.com/discover/concerts/washington",
        }
      ]
    }
  };
  
  // copy the existing More dropdown items and continually to observe any changes
  getMoreLinks();
  observeMore();

  // fetch dynamic data from GraphQL
  const query = `
    query expandedTopNav($countryCode: String!) {
      concertsRock: topSellingRecommendations(
        filter: "ccp-disc-music-rock"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      concertsPop: topSellingRecommendations(
        filter: "ccp-disc-music-pop"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      concertsCountry: topSellingRecommendations(
        filter: "ccp-disc-music-country"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      concertsRNB: topSellingRecommendations(
        filter: "ccp-disc-music-rnb"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      concertsHipHop: topSellingRecommendations(
        filter: "ccp-disc-music-hhrap"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      arts: topSellingRecommendations(
        filter: "ccp-disc-arts"
        countryCode: $countryCode
        limit: 9
      ) {
        ...RecomendationCategory
      }
      family: topSellingRecommendations(
        filter: "ccp-disc-family"
        countryCode: $countryCode
        limit: 12
      ) {
        ...RecomendationCategory
      }
    }

    fragment RecomendationCategory on Recommendations {
      items {
        attraction {
          name
          seoUrl
          imagesFiltered(ratio: "4_3") {
            url
          }
        }
      }
    }
  `;

  const url = "https://www.ticketmaster.com/api/next/graphql";
  const params = {
    "countryCode" : getCountry()
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query, 
      variables: params
    })
  };

  fetch(url, opts)
    .then(function(res){ return res.json()})
    .then(function(res){
      mergeData(res.data);
      init();
    })
    .catch(function(error) { 
      return console.error(error); 
    });


  function mergeData(data){
    const { 
      concertsRock, 
      concertsPop, 
      concertsCountry, 
      concertsRNB, 
      concertsHipHop, 
      arts, 
      family 
    } = data;

    setData(concertsData, mapItems(concertsRock.items), "ROCK");
    setData(concertsData, mapItems(concertsPop.items), "POP");
    setData(concertsData, mapItems(concertsCountry.items), "COUNTRY");
    setData(concertsData, mapItems(concertsRNB.items), "R&B");
    setData(concertsData, mapItems(concertsHipHop.items), "HIP-HOP/RAP");
    setData(artsData, mapItems(arts.items));
    setData(familyData, mapItems(family.items));
  }

  function mapItems(items) {
    const itemsArray = items.map(function(items){
      const tempItems = [];
      const { name, seoUrl, imagesFiltered } = items.attraction;
      tempItems.name = name;
      tempItems.link = seoUrl;
      tempItems.image = `${imagesFiltered[0].url}${imageConfig}`;
      return tempItems;
    });
    return itemsArray;
  }

  function setData(data, itemsArray, subcat) {
    if(subcat) data.subcategories.list[subcat] = data.subcategories.list[subcat].concat(itemsArray);
    else data.subcategories.list = data.subcategories.list.concat(itemsArray);
    
  }
    
  function init(){
    const navContainer = document.querySelector('nav');

    const expandoNav = document.createElement('div');
    expandoNav.className = "nav-dropdown-container";

    const navInnerContainer = document.createElement('div');
    navInnerContainer.className = "nav-dropdown-inner-container";


    // build and append expanded nav container
    navContainer.appendChild(expandoNav);
    expandoNav.appendChild(navInnerContainer);
    addCSS();

    // apply event listeners on nav elements
    navContainer.delegateEvent('.list-container', 'mouseover', function(e) { 
      const category = e.target.innerText.trim();
      const validCategories = ["Concerts", "Sports", "Arts & Theater", "Family", "More"];
      if(!validCategories.includes(category)) return;
      expandoNav.classList.add("nav-dropdown--open");
      
      // apply class name reset
      navInnerContainer.className = "nav-dropdown-inner-container";
      renderNavItems(navInnerContainer, category);
      toggleCategoryStyles(category);
      
    });


    // apply event listeners to hide expanded nav container. 
    // hide expanded nav container when right nav button items are hovered
    const rightNavButtonItems = document.querySelectorAll('.list-container button');
    for(var i = 1; i < rightNavButtonItems.length; i++) {
      rightNavButtonItems[i].addEventListener('mouseover', hideExpandoNav);
    }

    expandoNav.addEventListener('mouseleave', hideExpandoNav);
    expandoNav.addEventListener('mouseenter', function(){     
      if(this.querySelector('[class$="-sub"]').classList.contains('more-sub')) toggleCategoryStyles("More");
    });



    // GA Events
    expandoNav.delegateEvent('a', 'click', function(e){
      // set link as the nearest anchor link element.
      const link = e.target.nodeName !== "A" ? e.target.parentNode : e.target;

      // extract the link's GA data properties
      const category = link.getAttribute("data-event-cat") || '';
      const action = link.getAttribute("data-event-act") || '';
      const label = link.getAttribute("data-event-lbl") || '';

      // send them to GA
      pushToGA(category, action, label);
    });
  }
  

  function addCSS() {
    const styleNode = document.createElement("style");
    styleNode.id = "custom-navigation-css";
    styleNode.innerHTML = 
    `
    @keyframes fadeIn {
      0% { opacity: 0;} 
      100% { opacity: 1; }
    }
    .cat-active-item + .links__list,
    .links__row:nth-child(2) .links__list,
    .links__row:nth-child(3) .links__list { display: none !important; }

    .cat-active-item {
      background-color: rgba(38,38,38, 0.2);
    }
    .nav--fixed .cat-active-item {
      background-color: #e6e6e6;
    }

    .cat-active-item:after {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 4px solid #026cdf;
    }
    
    .cat-menu-container {
      grid-area: cat-menu;
      font-size: 14px;
    }
    
    .sub-cat-menu-container {
      grid-area: sub-cat-menu;
    }

    .nav-dropdown-container {
      position: absolute;
      top: 60px;
      background-color: #fff;
      padding: 35px 0;
      box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.06), 0 0 16px 0 rgba(0, 0, 0, 0.12);
      width: 100%;
      display: none;
      opacity: 0;
      justify-content: center;
    }

    .nav-dropdown--open {
      display: grid;
      animation: 300ms ease 100ms 1 normal forwards running fadeIn;
    }
    
    .nav-dropdown-inner-container {
      width: 1248px;
      display: grid;
      grid-template-columns: repeat(12, 82px);
      grid-template-rows: auto;
      grid-column-gap: 24px;
      grid-template-areas:
        ". . cat-menu cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu";
      font-family: Averta;
      color: #262626;
    }

    @media only screen and (max-width: 1247px) {
      .nav-dropdown-inner-container {
        width: 721px;
        grid-template-columns: repeat(12, 38px);
        grid-template-areas:
          "cat-menu cat-menu cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu";
      }
    } 

    .one-column-container.nav-dropdown-inner-container {
      grid-template-areas:
        ". . sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu"
        ". . see-all see-all see-all see-all see-all see-all see-all see-all see-all see-all";
    }

    .nav-dropdown-container:after {
      content: "";
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, #026cdf, #1f262d);
      position: absolute;
      bottom: 0;
    }
    

    .nav-dropdown-container p {
      opacity: 0.65;
      font-size: 12px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #262626;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .cat-menu {
      margin: 0 0 32px;
      list-style-type: none;
      padding: 0;
    }

    .cat-menu li {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .cat-menu a {
      font-weight: normal;
      color: #262626;
      text-decoration: none;
    }

    .cat-menu a:hover {
      color: #026cdf;
      cursor: pointer;
    }

    .hoverStyle a {
      text-transform: uppercase;
      font-weight: 600;
      color: #262626;
      text-decoration: none;
    }

    .hoverStyle a:hover,
    .hoverStyle a.active {
      color: #026cdf;
      cursor: pointer;
    }

    .hoverStyle a:hover:before,
    .hoverStyle a.active:before {
      content: "";
      width: 2px;
      height: 100%;
      background-color: #026cdf;
      position: absolute;
      height: 18px;
      margin-left: -6px;
    }

    .see-all-link {
      grid-area: see-all;
      margin-top: 32px;
      display: block;
      font-size: 14px;
      text-decoration: none;
      color: #026cdf;
      text-transform: none;
      white-space: nowrap;
    }

    .see-all-link:hover {
      color: #0150a7;
    }

    .sub-cat-menu {
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;     
      max-width: 552px;
      margin: 0;
      list-style-type: none;
      padding: 0;
    }

    .sub-cat-images {
      max-width: 672px;
    }

    .sub-cat-menu li {
      padding-left: 0;
      padding-right: 8px;
      padding-bottom: 8px;
      line-height: normal;
      cursor: pointer;
      width: 176px;
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;
      box-sizing: border-box;
      display: inline-block;
    }

    .sub-cat-images li {
      padding-left: 44px;
      line-height: 36px;
      width: 220px;
    }

    .sub-cat-images img {
      background-color: #000;
      width: 36px;
      height: 36px;
      position: absolute;
      margin-left: -44px;
      border-radius: 36px;
    }
    
    .sub-cat-menu li span {
      width: 176px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; 
      display: inline-block;
    }

    .sub-cat-menu a {
      font-size: 14px;
      text-decoration: none;
      color: #262626;
      text-transform: none;
      position: relative;
    }
    
    .sub-cat-menu a:hover {
      color: #026cdf;
    }

    .sports-sub .sub-cat-menu {
      max-width: 636px;
    }

    .sports-sub .sub-cat-menu li {
      width: 222px;
      line-height: 24px;
      padding-left: 40px;
    }

    .sports-sub .sub-cat-menu img {
      width: 32px;
      height: 24px;
      border-radius: 2px;
      margin-left: -40px;
    }
    
    .one-column-container .sub-cat-menu {
      -webkit-column-count: 4;
      -moz-column-count: 4;
      column-count: 4;     
      max-width: 896px;   
    }
    @media only screen and (max-width: 1247px) {
      .sub-cat-menu li, 
      .sub-cat-images li, 
      .sports-sub .sub-cat-menu li {
        width: 176px;
      }
      .sub-cat-images li span {
        width: 132px;
      }

      .one-column-container.nav-dropdown-inner-container {
        grid-template-areas:
          "sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu sub-cat-menu"
          "see-all see-all see-all see-all see-all see-all see-all see-all see-all see-all see-all see-all";
      }
    }
    `;
    
    document.head.appendChild(styleNode);  
  }
  
  // Depending on which nav item is hovered, it will render the expanded nav items accordingly.
  function renderNavItems(container, category) {
    const navItem = { 
      container: container, 
      category: category,
      hasImages: true
    };
    switch (category) {
      case "Concerts":
        navItem.data = concertsData;
        renderNavItem(navItem);
        break;

      case "Sports":
        navItem.data = sportsData;
        renderNavItem(navItem);
        break;
      
      case "Arts & Theater":
        navItem.data = artsData;
        renderNavItem(navItem);
        break;

      case "Family":
        const gaAttr = setGA(category, null, null, null, true);
        container.classList.add("one-column-container");
        container.innerHTML = 
        `
          <div class="sub-cat-menu-container family-sub"></div>
          ${ familyData.subcategories.categoryAll ? `<a href="${familyData.subcategories.categoryAll.link}" class="see-all-link" ${gaAttr}>${familyData.subcategories.categoryAll.name}</a>` : ''}
        `;
        const subCatItem = {
          container: document.querySelector('.family-sub'), 
          data: familyData,
          category: category,
          isHoverStyle: false,
          hasImages: true 
        }
        renderSubCat(subCatItem);
        break;
      
      case "More":
        navItem.data = moreData;
        navItem.hasImages = false;
        renderNavItem(navItem);
        break;
    }
  }

  // nav item singleton to render
  function renderNavItem(navItem){
    const { container, data, category, hasImages } = navItem;
    const lowercaseType = category !== "Arts & Theater" ? category.toLowerCase() : "arts";
    const isHoverStyle = category === "Concerts" || category === "Sports";
    const gaAttr = setGA(category, null, null, null, true);

    // render HTML markups
    container.innerHTML = 
    `
    <div class="cat-menu-container">
      <p>${data.categories.heading}</p>
      <ul class="cat-menu ${isHoverStyle ? 'hoverStyle' : ''} ${lowercaseType}">
        ${generateListItems(data.categories.list, category)}
      </ul>
      ${renderSideItems(data, category)}
      ${ data.categories.categoryAll ? `<a href="${data.categories.categoryAll.link}" class="see-all-link" ${gaAttr}">${data.categories.categoryAll.name}</a>` : ''}
    </div>
    <div class="sub-cat-menu-container ${lowercaseType}-sub"></div>
    `;
    const subCat = document.querySelector(`.${lowercaseType}-sub`);
    
    const subCatItem = {
      container: subCat, 
      subcategory: data.categories.list[0].name,
      data: data,
      category: category,
      isHoverStyle: isHoverStyle,
      hasImages: hasImages 
    };

    renderSubCat(subCatItem);

    if (isHoverStyle) {
      const navContainer = document.querySelector('nav');
      document.querySelectorAll(`.hoverStyle.${lowercaseType} a`)[0].classList.add("active");

      navContainer.delegateEvent(`.${lowercaseType}.cat-menu li a`,'mouseover',function(e){
        const linkElement = e.target;
        const subcategory = linkElement.innerText;
        subCatItem.subcategory = subcategory;
        renderSubCat(subCatItem);
        document.querySelectorAll(`.hoverStyle.${lowercaseType} a`).forEach(
          function(item) { 
            item.classList.remove("active"); 
          }
        );
        linkElement.classList.add("active");
      });
    }
    
  }
  
  // render concerts subcategory when hovered
  function renderSubCat(subCatItem) {
    const { container, subcategory, data, category, isHoverStyle, hasImages } = subCatItem;
    if ( category == null) return;
    const subheading = {
      "Concerts": `${data.subcategories.heading} ${subcategory}`,
      "Sports": `${subcategory} ${data.subcategories.heading}`,
      "Arts & Theater": data.subcategories.heading,
      "Family": data.subcategories.heading,
      "More": data.subcategories.heading,
    };
  
    container.innerHTML =
    `
    <p>${subheading[category]}</p>
    <ul class="sub-cat-menu ${hasImages ? 'sub-cat-images' : ''}">
      ${ isHoverStyle ? generateListItems(data.subcategories.list[subcategory], category, subcategory) : generateListItems(data.subcategories.list, category) }
    </ul>
    `;
  }

  function renderSideItems(data, category){
    if(!data.sidecategories) return '';

    return `
    <p>${data.sidecategories.heading}</p>
    <ul class="cat-menu">
      ${generateListItems(data.sidecategories.list, category)}
    </ul>
    `;
  }

  function generateListItems(arr, category, subcategory){
    // build the list items
    if (typeof arr == "object" && arr.length > 0){
      return arr.map(function(item, index) { 
        const itemHTML = item.image ? `<img src="${item.image}" alt="${item.name}" /><span>${item.name}</span>` : item.name;
          // set category and subcategory to pass as data attributes for GA  
        const gaAttr = setGA(category, subcategory, index +1, item.name, false);
        return `<li role="menuitem"><a href="${item.link}" title="${item.name}" ${gaAttr}>${itemHTML}</a></li>`; 
      }).reduce(function(acc,cv){ 
        return acc + cv; 
      }, '');
    }
    return "No events available";
  }
  
  // Extract More Dropdown Links from existing and push them in to our moreData
  function getMoreLinks(){
    const moreNodeList = document.querySelectorAll('.link--has-other')[0].nextElementSibling.querySelectorAll('a');
    const temp = [];
    for(var i = 0; i < moreNodeList.length; i++) {
      let tempName = moreNodeList[i].innerText;
      // rename link names
      if(moreNodeList[i].innerText === "VIP") tempName = "VIP Tickets";
      if(moreNodeList[i].innerText === "Deals") tempName = "Ticket Deals";
      if(moreNodeList[i].innerText === "For You") tempName = "Just For You";
      // push them in
      temp.push({
        name: tempName,
        link: moreNodeList[i].href
      });
    }
    moreData.categories.list = temp;
  }

  // Observe any changes to the More dropdown
  function observeMore(){
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'childList') {
            getMoreLinks();
          }
        });
      });
  
      const node = document.querySelectorAll('.links__row')[0];
      observer.observe(node, { attributes: true, childList: true });
    }
  }

  function toggleCategoryStyles(category){
    const navLeftContainer = document.querySelectorAll('.links__row')[0];
    const categoryLinks = navLeftContainer.querySelectorAll('span a[class^="Item__StyledLink"], span button[class^="Item__StyledLink"]');
    for (var i = 0; i < categoryLinks.length; i++){
      if(categoryLinks[i].innerText.trim() == category) {
        categoryLinks[i].classList.add("cat-active-item");
      }
      else {
        categoryLinks[i].classList.remove("cat-active-item");
      }
    }
    
  }

  function hideExpandoNav(){
    const expandoNav = document.querySelector(".nav-dropdown-container");
    expandoNav.classList.remove("nav-dropdown--open");
    toggleCategoryStyles('');
  }

  function pushToGA(category, action, label){
    window.dataLayer = window.dataLayer || [];
    

    if (typeof window.dataLayer.push === 'function') {
      const gaEvent = {
        'event': 'eventTracker',
        'data-event-category': category,
        'data-event-label': label,
        'data-event-action': action,
        'data-event-value': 0,
        'nonInteraction': 0,
      };
      window.dataLayer.push(gaEvent);
    }
  }

  function setGA(category, subcategory, linkIndex, linkName, hasSeeAll) {
    const labelSubcategory = subcategory ? `-${subcategory}-${linkIndex}` : '';
    const seeAll = hasSeeAll ? `${category}-See All` : '';
    const label = `Global Header-${hasSeeAll ? seeAll : `${category + labelSubcategory}-${linkName}`}`;
    return `data-event-cat="CCP Discovery" data-event-act="${category}" data-event-lbl="${label}" data-event-value="0"`;
  }

  function getCountry(){
    if(typeof __NEXT_DATA__ == "undefined") return "";
    return JSON.parse(__NEXT_DATA__.props.initialProps.headers["x-tm-ff"])["country-domain"]
  }
  
  
})();