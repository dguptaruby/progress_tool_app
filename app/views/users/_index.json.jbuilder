json.array! @users do |user|
  json.id user.id
  json.first_name user.first_name
  json.last_name user.last_name
  json.email user.email
  json.created_at user.created_at
  json.project_list ""

  json.projects user.projects do |project|
    json.project project.id
    json.project_name project.name
  end
end