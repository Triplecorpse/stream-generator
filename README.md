# Advertima stream generator

[Description](#description)

[Prerequisites](#prerequisites)

[Set up the project](#set-up-the-project)

[Philosophy](#philosophy)

[Usage](#usage)

[For developers](#for-developers)

#### Description:
This app generates stream of data as it is in Advertima's EMS engine.
However, slight differences may have place so it's strongly recommended to make final tests on real engine.

#### Prerequisites
You should have `git` and `nodejs` installed, also you should have constant internet access to use CDN libraries.
This generator was developed on `Node 6.11`

#### Set up the project
Go inside the project's folder, install the dependencies by `npm i`,
then go to `/public` and do the same, after run `ng build` to build the frontend part.
After all return 1 folder back and run `npm start` to run the server.
To save time resources, for the first run you could go to the folder and type everything in one command:

`npm i && cd public && npm i && ng build && cd .. && npm start`

the next time you can run it just with

`npm start`

#### Philosophy
The application waits for websocket connection on `localhost:3333`. If connection is established,
it waits for a message with key `method_name: 'request_manifest'`. Then it responses with an object:

    {
        type: 'rpc_response',
        message_id: {...message_id, which comes from frontend...},
        success: true,
        data: {...manifest is here...}
    }

After all, it starts to emit data of `person_alive` 5 times per second and manifest 1 time per minute.

#### Usage
1. **Generate person**. Go to `localhost:3333` in your browser. It opens a control page for the stream.
The first thing you will see - is a form to add new people. You can select any available parameters and launch person.
If `quantity` is more than 1, it will launch more people with such parameters. `Deviation` configures the instability
of given parameter.

2. **Edit manifest**. Actually, manifest file lays in `%PROJECT_FOLDER%/assets/manifest.json`.
You can edit in both through frontend app and in any text editor - no matter - it will update the next time manifest message comes.
Nevertheless, you need to restart the server if you want the very first manifest in `rpc_response` to come updated.

3. **Content, applications, pron etc**. Public folders are two: `%PROJECT_FOLDER%/assets` and `%PROJECT_FOLDER%/public`.
These folders are `localhost:3333`. So, if your application is in `%PROJECT_FOLDER%/assets/video_app/app.js`, you should
access it with uri `http://localhost:3333/video_app/app.js`. So with content also.
Exactly these paths should be in proper manifest fields (`asset.uri`, `application.uri` etc).
Also make sure that controller and sdk don't change the paths. In other words, the end paths in controller and sdk
should refer to proper resources.

#### For developers
There is unfinished functionality in generator.

The **first** one is convenient manifest editor. There are plugins that generate forms from JSON schema
but they didn't work in first 5 minutes and it was not the main task.

The **second** is fetching real manifest from cloud, downloading the stuff, unzips and replacing uris with local copies.
Now only downloading of applications work.

The **third** is to make full manifest update without any restarting (for more info look at **Edit manifest**)
