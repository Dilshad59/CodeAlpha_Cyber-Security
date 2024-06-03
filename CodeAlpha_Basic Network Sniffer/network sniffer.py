from scapy.all import sniff, IP, TCP
import logging

logging.basicConfig(filename='packets.log', level=logging.INFO, format='%(asctime)s %(message)s')

def packet_callback(packet):
    if IP in packet:
        ip_src = packet[IP].src
        ip_dst = packet[IP].dst
        packet_info = f"IP Packet: {ip_src} -> {ip_dst}"
        
        if TCP in packet:
            tcp_sport = packet[TCP].sport
            tcp_dport = packet[TCP].dport
            packet_info += f" TCP Segment: {ip_src}:{tcp_sport} -> {ip_dst}:{tcp_dport}"
        
        print(packet_info)
        logging.info(packet_info)

print("Starting the network sniffer...")
sniff(filter="ip", prn=packet_callback, store=0)
