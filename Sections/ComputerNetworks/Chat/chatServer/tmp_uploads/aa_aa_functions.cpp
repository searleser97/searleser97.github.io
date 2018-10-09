#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/stat.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <libgen.h>

void error(const char * msj){
	perror(msj);
	exit(EXIT_FAILURE);
}

struct DatagramPacket{
	char *buffer;
	int size;
	char *host;
	int port;

	DatagramPacket(char *buffer, int size): buffer(buffer), size(size), port(0), host(NULL){}

	DatagramPacket(char *buffer, int size, char *host, int port): buffer(buffer), size(size), port(port){
		this->host = (char *)malloc((strlen(host)+10) * sizeof(char));
		strcpy(this->host, host);
	}
};

struct DatagramSocket{
	int cd;
	int port;

	DatagramSocket(): port(0){
		cd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
		if(cd < 0){
			error("Error al intentar crear el socket.\n");
			cd = -1;
			return;
		}
	}

	DatagramSocket(int port): port(port){
		cd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
		if(cd < 0){
			error("Error al intentar crear el socket.\n");
			cd = -1;
			return;
		}
		struct sockaddr_in address;
		memset((char *)&address, 0, sizeof(address));
		address.sin_family = AF_INET;
		address.sin_port = htons(port);
		address.sin_addr.s_addr = htonl(INADDR_ANY);
		if(bind(cd, (struct sockaddr *)&address, sizeof(address)) < 0){
			error("Error en el bind.\n");
			cd = -1;
			return;
		}
	}

	int receive(DatagramPacket* p){
		if(cd < 0){
			error("El socket esta cerrado.\n");
			return 0;
		}
		struct sockaddr_in address;
		socklen_t len = sizeof(address);
		int n = recvfrom(cd, p->buffer, p->size, 0, (struct sockaddr *)&address, &len);
		if(n < 0){
			perror("Error de lectura.\n");
			close(cd);
			cd = -1;
		}
		p->host = inet_ntoa(address.sin_addr);
		p->port = ntohs(address.sin_port);
		p->size = n;
		return n;
	}

	int send(DatagramPacket* p){
		if(cd < 0){
			error("El socket esta cerrado.\n");
			return 0;
		}
		struct sockaddr_in address;
		memset((char *)&address, 0, sizeof(address));
		address.sin_family = AF_INET;
		address.sin_port = htons(p->port);
		if(inet_pton(AF_INET, p->host, &address.sin_addr) <= 0){
			char msj[100];
			sprintf(msj, "Error en el nombre del host del servidor \"%s\".\n", p->host);
			error(msj);
			close(cd);
			cd = -1;
			return 0;
		}
		int len = sizeof(address);
		int n = sendto(cd, p->buffer, p->size, 0, (struct sockaddr *)&address, len);
		if(n < 0){
			perror("Error de escritura.\n");
			close(cd);
			cd = -1;
		}
		return n;
	}

	void Close(){
		close(cd);
		cd = -1;
	}

	~DatagramSocket(){
		Close();
	}
};