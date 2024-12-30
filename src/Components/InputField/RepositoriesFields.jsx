import { useSelector, useDispatch } from 'react-redux';
import SelectField from './path_to_SelectField';
import { setSelectedRepository } from './path_to_redux_slice';

export const RepositorySelector = () => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories); // Assuming repositories are stored in Redux

  const handleChange = (e) => {
    dispatch(setSelectedRepository(e.target.value));  // Set the selected repository in Redux
  };

  return (
    <SelectField
      name="repository"
      value={null}
      onChange={handleChange}
      options={repositories.map((repo) => ({ label: repo.name, value: repo.id }))}
      placeholder="Select Repository"
      multiSelect={false}
    />
  );
};
