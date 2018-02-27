class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note, only: [:update, :destroy, :show]

  def show
    render json: @note, status: :ok
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
