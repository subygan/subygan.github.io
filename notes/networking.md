
- port 0 - 1024 is system ports and can be accessed by root user only
- iptables
```shell
sudo iptables -t nat -A PREROUTING -p tcp --dport -j DNAT --to-destination <someIP>
```
client usually creates a random port for tcp connections, when making a request, because there should be a port for receiving the response.