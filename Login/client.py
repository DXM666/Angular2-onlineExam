import socket
import time
content = '''
<html>
<head>
    <meta charset="UTF-8" name="referrer" content="no-referrer|no-referrer-when-downgrade|origin|origin-when-crossorigin|unsafe-url">    
</head>
<body>
<div id="login_frame" algin="cneter">
      <h1>Login</h1>
      <form >
          <p><label class="label_input">用户名</label><input type="text" id="username" class="text_field"/></p>
          <p><label class="label_input">密码</label><input type="text" id="password" class="text_field"/></p>
          <div id="login_control">
          <input type="submit" id="btn_login" value="登录" onclick="login();"/>
          <input type="reset" id="btn_reset" value="重置">
          </div>
      </form>
</div>
</body>
</html>
'''

def TCPget(sock, addr):  # TCP服务器端处理逻辑

    print('Accept new connection from %s:%s.' % addr)  # 接受新的连接请求
    data = sock.recv(1024)  # 接受其数据
    time.sleep(1)  # 延迟
    data = str(data, encoding='utf-8')
    if '?' not in data:
        response = '''
HTTP/1.1 200 ok
Content-Type: text/html;
charset=UTF-8 
Content-Length: 600


%s
''' % content
        sock.sendall(bytes(response,encoding='utf-8'))
    else:
        l1 = data.split(' ')[1].split('?')[1].split('&')[0].split('=')[1]
        l2 = data.split(' ')[1].split('?')[1].split('&')[1].split('=')[1]
        if str(l1) == 'admin' and str(l2) == '123456':
            response='''
HTTP/1.1 200 ok
Content-Type: text/html;
charset=UTF-8 
Content-Length: 600


login successful
'''
            sock.send(bytes(response, encoding='utf-8'))
        else:
            response = '''
HTTP/1.1 200 ok
Content-Type: text/html;
charset=UTF-8 
Content-Length: 600


fail
'''
            sock.send(bytes(response, encoding='utf-8'))

def TCPpost(sock, addr,data):
    print('Accept new connection %s:%s.' % addr)  # 接受新的连接请求
    # data = sock.recv(1024)  # 接受其数据
    # time.sleep(1)  # 延迟
    # data = str(data, encoding='utf-8')
    value = data.split('\r\n\r\n')[1]
    # l = []
    # for key_value in value.split('&'):
    #     l.append(key_value.split('='))
    # parameters = dict(l)
    l1 = data.split('\r\n\r\n')[1].split('&')[0].split('=')[1]
    l2 = data.split('\r\n\r\n')[1].split('&')[1].split('=')[1]
    if str(l1) == 'admin' and str(l2) == '123456':
        response = '''
HTTP/1.1 200 ok
Content-Type: text/html;
charset=UTF-8 
Content-Length: 600


login successful
'''
        sock.send(bytes(response, encoding='utf-8'))
    else:
        response = '''
HTTP/1.1 200 ok
Content-Type: text/html;
charset=UTF-8 
Content-Length: 600


fail
'''
        sock.send(bytes(response, encoding='utf-8'))
def TCPlink(sock):
    sock, addr = s.accept()  # 接收一个新连接
    data = sock.recv(1024)
    data = str(data,encoding='utf-8')
    request = data.split(' ')[0]
    paramater = data.split(' ')[1]
    if 'GET' == request:
        TCPget(sock,addr,data)
    elif 'POST' == request:
        TCPpost(sock,addr,data)
    else:
        response = '''
HTTP/1.1 404 Not Found

404 not found
'''
        sock.send(bytes(response, encoding="utf8"))
        sock.close()

if __name__ == '__main__':
    # 创建socket (AF_INET:IPv4, AF_INET6:IPv6) (SOCK_STREAM:面向流的TCP协议)
    s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.bind(('127.0.0.1', 10021))  # 绑定本机IP和任意端口(>1024)
    s.listen(1)  # 监听，等待连接的最大数目为1
    print('Server is running...')
    while True:
        sock, addr = s.accept()  # 接收一个新连接
        try:
            # TCPpost(sock,addr)
            TCPget(sock, addr)
            # TCPlink(sock)
        except Exception as e:
            response = '''
                       HTTP/1.1 500 Internal Server Error
                       
                       
                       
                       500 服务器繁忙
                    '''
            sock.send(bytes(response, encoding="utf-8"))
        sock.close()