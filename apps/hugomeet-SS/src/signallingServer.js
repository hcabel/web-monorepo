/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signallingServer.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: hcabel <hcabel@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/19 22:48:34 by hcabel            #+#    #+#             */
/*   Updated: 2021/11/19 22:48:38 by hcabel           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require("express");
const app = express();
const port = process.env.NX_HUGOMEET_SS_ENDPOINT.match(/:[0-9]{4}/)[0].slice(1);
const http = require("http");
const server = http.createServer(app);
const ws = require("ws");

const onClientConnection = require("./wsClient");
const clientServer = new ws.Server({ server: server });

// Heartbeat interval (30 seconds is safe for most proxies)
const HEARTBEAT_INTERVAL = 30000;

clientServer.on("connection", (socket, req) => {
	socket.isAlive = true;

	socket.on("pong", () => {
		socket.isAlive = true;
	});

	onClientConnection(socket, req);
});

// Ping all clients periodically to keep connections alive
const heartbeatInterval = setInterval(() => {
	clientServer.clients.forEach((socket) => {
		if (socket.isAlive === false) {
			return socket.terminate();
		}
		socket.isAlive = false;
		socket.ping();
	});
}, HEARTBEAT_INTERVAL);

clientServer.on("close", () => {
	clearInterval(heartbeatInterval);
});

console.log(`WebSocket listening to Client connections on *:${port}`);

server.listen(port, () => {
	console.log(`Signalling Server: READY`);
});
