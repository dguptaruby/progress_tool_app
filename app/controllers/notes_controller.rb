class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note, only: [:update, :destroy, :show]

  def show
    @note = Note.find(params[:id])
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "notes/show.json.jbuilder", note: @note
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end

  def index
    milestone = Milestone.find(params[:milestone_id])
    @notes = milestone.notes.order("created_at ASC")

    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "notes/index.json.jbuilder", notes: @notes
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: :created
    else
      render json: @note.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @note.update_attributes(note_params)
      render json: @note, status: :ok
    else
      render json: @note.errors.messages, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    head :no_content
  end

  private

  def note_params
    params.require(:note).permit(:content, :user_id, :admin_id, :milestone_id, attachments: [])
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
