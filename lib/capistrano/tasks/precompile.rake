namespace :assets do
  desc 'Precompile assets locally and then rsync to web servers'
  task :precompile do
    run_locally do
      with rails_env: stage_of_env do
        execute :bundle, 'exec rake assets:precompile'
      end
    end

    on roles(:web), in: :parallel do |server|
      run_locally do
        execute :rsync,
          "-a --delete ./public/packs/ /home/#{fetch(:user)}/apps/#{fetch(:application)}/#{shared_path}/public/packs/"
        execute :rsync,
          "-a --delete ./public/assets/ /home/#{fetch(:user)}/apps/#{fetch(:application)}/#{shared_path}/public/assets/"
      end
    end

    run_locally do
      execute :rm, '-rf public/assets'
      execute :rm, '-rf public/packs'
    end
  end
end