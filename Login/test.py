from flask import Flask,jsonify,url_for,render_template
import flask_login
from flask_restful import reqparse, abort, Api, Resource,original_flask_make_response

app=  Flask(__name__)

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

def make_public_task(tasks):
    new_tasks = {}
    for field in tasks:
        if field == 'id':
            new_tasks['uri'] = url_for('get_tasks', task_id=tasks['id'], _external=True)
        else:
            new_tasks[field] = tasks[field]
    return new_tasks

@app.route('/')
def root():
    return app.send_static_file('login.html')

@app.route('/todo/api/tasks',methods=['GET'])
def get_tasks():
    return jsonify({'tasks':list(map(make_public_task,tasks))})

# @app.route('/todo/api/tasks/<int:task_id>',methods=['GET'])
# def get_task(task_id):
#     task = filter(lambda t: t['id'] == task_id, tasks)
#     if len(task) == 0:
#         abort(404)
#     return jsonify({'task': task[0]})
#
# @app.errorhandler(404)
# def not_found(error):
#     return abort(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)