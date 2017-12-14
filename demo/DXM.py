# from flask import Flask, jsonify, make_response, request, abort,render_template,Response
# import json
#
#
# # 静态文件的放置路径，可根据实际情况设置，这里设置为默认路径：'./static/'
# app = Flask(__name__, static_url_path='')
#
# #模拟json数据
# # tasks =  [
# #     {
# #             "name": "Chester",
# #             "school": "昆明理工大学",
# #             "perfession":"通信工程",
# #             "age": "20",
# #             "education":"本科",
# #             "system":"全日制"
# #     }
# # ]
# tasks = {
#     "data": [
# {
#   "paper": "A",
#   "chooseList": [
#     {
#       "paper": "A",
#       "questionNumber": 1,
#       "question": "1+1=?",
#       "options": [ "A.0", "B.2", "C.3", "D.4" ],
#       "correctAnswer": "B.2",
#       "score": 2
#     },
#     {
#       "paper": "A",
#       "questionNumber": 2,
#       "question": "1+2=?",
#       "options": [ "A.0", "B.2", "C.3", "D.4" ],
#       "correctAnswer": "C.3",
#       "score": 2
#     },
#     {
#       "paper": "A",
#       "questionNumber": 3,
#       "question": "下列那些是编程语言?",
#       "options": [ "A.JAVA", "B.C#", "C.PHP", "D.HTML" ],
#       "correctAnswer": "A.JAVA--B.C#--C.PHP",
#       "score": 1
#     }
#   ],
#   "fillBlankList": [
#     {
#       "paper": "A",
#       "questionNumber": 4,
#       "question": "1+1=___?",
#       "correctAnswer": "2",
#       "answerIndex": 1,
#       "score": 1
#     },
#     {
#       "paper": "A",
#       "questionNumber": 5,
#       "question": "1到5之间有几个整数___、___、___",
#       "correctAnswer": "2,3,4",
#       "answerIndex": 1,
#       "score": 1
#     },
#     {
#       "paper": "A",
#       "questionNumber": 26,
#       "question": "1到5之间有几个整数___、___、___,7到10之间有几个整数___、___",
#       "correctAnswer": "2,3,4",
#       "answerIndex": 1,
#       "score": 1
#     },
#     {
#       "paper": "A",
#       "questionNumber": 26,
#       "question": "1到5之间有几个整数___、___、___,7到10之间有几个整数___、___",
#       "correctAnswer": "8,9",
#       "answerIndex": 2,
#       "score": 1
#     }
#   ],
#   "judgmentList": [
#     {
#       "paper": "A",
#       "questionNumber": 6,
#       "question": "1+1=1",
#       "correctAnswer": '错误',
#       "score": 2
#     },
#     {
#       "paper": "A",
#       "questionNumber": 7,
#       "question": "1+2=3",
#       "correctAnswer": '正确',
#       "score": 2
#     }
#   ],
#   "subjectList": [
#     {
#       "paper": "A",
#       "questionNumber": 8,
#       "question": "1+1=1",
#       "correctAnswer": "错误",
#       "score": 2
#     },
#     {
#       "paper": "A",
#       "questionNumber": 9,
#       "question": "1+2=3",
#       "correctAnswer": "正确",
#       "score": 2
#     }
#   ]
# }
#
#     ]
# }
#
# #设置根路由
# @app.route('/')
# def root():
#     result_json = json.dumps(tasks)
#     # Response
#     resp = Response(result_json)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp
#
# #404
# @app.errorhandler(404)
# def not_found(error):
# 	return make_response(jsonify({'error': 'Not found'}), 404)
#
# if __name__ == '__main__':
# 	app.run(debug=True,port=9000)
#
l = [1,2,3,4,5,6]
print(l[1:])