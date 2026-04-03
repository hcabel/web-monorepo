import { create_app } from "./app/app";

const app = create_app();

const port = process.env.NX_PROJECT_API_ENDPOINT!.match(/:(\d+)/)?.[1];
app.listen({ port: parseInt(port!) }, async() => {
	console.log(`Running at ${process.env.NX_PROJECT_API_ENDPOINT}`);
}).on("error", console.error);
