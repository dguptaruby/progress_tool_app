namespace :custom do
  desc 'run some rake db task'
  task :run_db_task do
    on roles(:app) do
      within "#{release_path}" do
        with rails_env: "#{fetch(:stage)}" do
          execute :rake, "db:create"
        end
      end
    end
  end
end