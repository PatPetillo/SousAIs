const https = require('https')

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
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`${event.request.intent.slots.Item.value} added to fridge`, false), {}
                            )
                        )
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
                        https.get("https://jsonplaceholder.typicode.com/posts/1", function(res) {
                            var body = "";
                            res.on('data', (chunk) => { body += chunk })
                            res.on('end', (chunk) => {
                                var data = JSON.parse(body)
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`I found a ${data.title}`)
                                    )
                                )
                            })
                        })

                        break;

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

}

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