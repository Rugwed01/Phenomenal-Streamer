from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from extensions import mongo # Import directly from our new extensions file

api_bp = Blueprint('api', __name__)

# The global variable and set_mongo_instance function have been removed.

# --- CRUD API Endpoints for Overlays ---

# CREATE an overlay
@api_bp.route('/overlays', methods=['POST'])
def add_overlay():
    data = request.get_json()
    if not data or 'type' not in data or 'content' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    overlays = mongo.db.overlays
    overlay_id = overlays.insert_one(data).inserted_id
    new_overlay = overlays.find_one({'_id': overlay_id})
    
    # Convert ObjectId to a string for the JSON response
    new_overlay['_id'] = str(new_overlay['_id'])
    
    return jsonify(new_overlay), 201

# READ all overlays
@api_bp.route('/overlays', methods=['GET'])
def get_overlays():
    overlays = mongo.db.overlays.find()
    result = []
    for overlay in overlays:
        overlay['_id'] = str(overlay['_id'])
        result.append(overlay)
    return jsonify(result), 200

# UPDATE an overlay
@api_bp.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    data = request.get_json()
    overlays = mongo.db.overlays
    
    result = overlays.update_one({'_id': ObjectId(id)}, {'$set': data})
    
    if result.matched_count:
        return jsonify({'message': 'Overlay updated successfully'}), 200
    return jsonify({'error': 'Overlay not found'}), 404

# DELETE an overlay
@api_bp.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    overlays = mongo.db.overlays
    result = overlays.delete_one({'_id': ObjectId(id)})
    
    if result.deleted_count:
        return jsonify({'message': 'Overlay deleted successfully'}), 200
    return jsonify({'error': 'Overlay not found'}), 404