from flask import Flask, jsonify, make_response, request, abort,render_template,Response
import json


# 静态文件的放置路径，可根据实际情况设置，这里设置为默认路径：'./static/'
app = Flask(__name__)

#模拟json数据
tasks =  [
    {
            "name": "Chester",
            "school": "昆明理工大学",
            "perfession":"通信工程",
            "age": "20",
            "education":"本科",
            "system":"全日制"
    }
]

#设置根路由
@app.route('/')
def root():
    result_json = json.dumps(tasks)
    # Response
    resp = Response(result_json)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

#404
@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
	app.run(debug=True,port=9000)

