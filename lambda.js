const https = require('https')
const http = require('http')

exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`)
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("My name is Sue! Tell me what your cuisine preferences are so that we can start cooking!", false), {}
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch (event.request.intent.name) {
                    case "AddItemToFridge":
                        const postData = JSON.stringify({ food: event.request.intent.slots.Item.value })
                        const options = {
                            hostname: 'http://sousais.herokuapp.com',
                            port: 8080,
                            path: '/api/fridge',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Content-Length': Buffer.byteLength(postData)
                            }
                        }
                        http.request(options, (res) => {
                            res.setEncoding('utf8');
                            res.on('data', (chunk) => { console.log(`BODY: ${chunk}`) })
                            res.on('error', e => console.log("ERROR", e))
                            res.on('end', () => {
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`${event.request.intent.slots.Item.value} added to fridge`, false), {}
                                    )
                                )
                            })

                        })

                        break;

                    case "SetRecipePreference":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Great choice, I'll look up some tasty ${event.request.intent.slots.Pref.value} recipes`, false), {}
                            )
                        )
                        break;

                    case "AddAllergies":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`No problem, I'll exclude ${event.request.intent.slots.Allergy.value} from the recipes`, false), {}
                            )
                        )
                        break;

                    case "AddDiet":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Ok, I'll make sure your meal sticks to a ${event.request.intent.slots.Diet.value} diet`, false), {}
                            )
                        )
                        break;

                    case "GetRecipes":
                        let rcp;
                        http.get("http://sousais.herokuapp.com/api/recipe", function(res) {
                            var body9 = "";
                            res.on('data', (chunk) => { body9 += chunk })
                            res.on('end', (chunk) => {
                                var data = JSON.parse(body9)
                                rcp = data[0];
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`I found a ${data[0].name} recipe. Would you like me to tell you how to make it?`)
                                    )
                                )
                            })
                        })
                        const postRcp = JSON.stringify({ steps: rcp.steps.split(".") })
                        const option = {
                            hostname: 'http://sousais.herokuapp.com',
                            port: 8080,
                            path: '/api/recipe',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Content-Length': Buffer.byteLength(postRcp)
                            }
                        }
                        http.request(option, (res) => {
                            res.setEncoding('utf8');
                            res.on('data', (chunk) => { console.log(`BODY: ${chunk}`) })
                            res.on('end', () => {})
                        })
                        break;

                    case "GetSteps":
                        http.get('http://sousais.herokuapp.com/api/recipe/steps', function(res) {
                            var body1 = "";
                            res.on('data', (chunk) => { body1 += chunk })
                            res.on('end', (chunk) => {
                                var data = JSON.parse(body1)
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`The first step is ${data[0]}. Let me know when you are ready for the next step.`)
                                    )
                                )
                            })
                        });
                        http.get('http://sousais.herokuapp.com/api/recipe/nextstep', (res) => {
                            res.on('data', (chunk) => { console.log(`BODY: ${chunk}`) })
                            res.on('end', () => {})
                        })
                        break;

                    case "NextStep":
                        http.get('http://sousais.herokuapp.com/api/recipe/steps', function(res) {
                            var body5 = "";
                            res.on('data', (chunk) => { body5 += chunk })
                            res.on('end', (chunk) => {
                                var data = JSON.parse(body5)
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`The first step is ${data[0]}. Let me know when you are ready for the next step.`)
                                    )
                                )
                            })
                        });
                        http.get('http://sousais.herokuapp.com/api/recipe/nextstep', (res) => {
                            res.on('data', (chunk) => { console.log(`BODY: ${chunk}`) })
                            res.on('end', () => {})
                        })
                        break;


                        // case "GetVideoViewCount":
                        //   var endpoint = "" // ENDPOINT GOES HERE
                        //   var body = ""
                        //   https.get(endpoint, (response) => {
                        //     response.on('data', (chunk) => { body += chunk })
                        //     response.on('end', () => {
                        //       var data = JSON.parse(body)
                        //       var viewCount = data.items[0].statistics.viewCount
                        //       context.succeed(
                        //         generateResponse(
                        //           buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                        //           {}
                        //         )
                        //       )
                        //     })
                        //   })
                        //   break;

                        // case "GetVideoViewCountSinceDate":
                        //   console.log(event.request.intent.slots.SinceDate.value)
                        //   var endpoint = "" // ENDPOINT GOES HERE
                        //   var body = ""
                        //   https.get(endpoint, (response) => {
                        //     response.on('data', (chunk) => { body += chunk })
                        //     response.on('end', () => {
                        //       var data = JSON.parse(body)
                        //       var viewCount = data.items[0].statistics.viewCount
                        //       context.succeed(
                        //         generateResponse(
                        //           buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                        //           {}
                        //         )
                        //       )
                        //     })
                        //   })
                        //   break;

                    default:
                        throw "Invalid intent"
                }

                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`)
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

        }

    } catch (error) { context.fail(`Exception: ${error}`) }

};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}