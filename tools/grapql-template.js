/*
GraphQL Queries and Fetch
Description: Template for querying and fetching from GraphQL using plain JavaScript. This example can be used on Ticketmaster.com.
Technologies: JavaScript and GraphQL 
*/
(function() {
  const query = `
      query expandedTopNav(
        $countryCode: String!,
        $limit: Int = 9
      ) {
        Rock: topSellingRecommendations(
          filter: "ccp-disc-music-rock"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        Pop: topSellingRecommendations(
          filter: "ccp-disc-music-pop"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        Country: topSellingRecommendations(
          filter: "ccp-disc-music-country"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        Alternative: topSellingRecommendations(
          filter: "ccp-disc-music-alt"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        HipHop: topSellingRecommendations(
          filter: "ccp-disc-music-hhrap"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        ArtAndTheater: topSellingRecommendations(
          filter: "ccp-disc-arts"
          countryCode: $countryCode
          limit: $limit
        ) {
          ...RecomendationCategory
        }
        FamilyTheater: topSellingRecommendations(
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
            id
            imagesFiltered(ratio: "4_3") {
              url
              id
            }
          }
        }
      }
    `;

  const url = "https://www.ticketmaster.com/api/next/graphql";
  const params = {
    "countryCode" : "US"
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
      return console.log(res.data);
    })
    .catch(function(error) { 
      return console.log(error); 
    });
     
})();