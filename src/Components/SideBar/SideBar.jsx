// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import InputField from "../InputField/InputField";
// import Loading from "../Loading/Loading";
// import { usePost } from "../../Custom Hooks/usePost";
// import { addCountEntry, updateCountEntry } from "../../Redux/itemSlice";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

// const Sidebar = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [loginId, setLoginId] = useState({
//     login: "blZH2Pn8ozchQ4isdq0E31HYkgE54qiWDE9X4SqflAdhgYgTStb2RSS7yr0qv5+pizQNGiModlUHJLrYs2C8HZ8l+Bq6XKTSGRTk6nuT17UQkqD5if4bjyT6cKcIE1QpyZ7GGiye1Qdm0+er3uS7cuBHRhH6veinhdUbOlMbxBRnfa0JiuhMD1KPjASx+TPYrsu/dzBzYPl5TVs+bqbLIg==",
//     repoLogin: "",
//     documentLogin: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     repos: "",
//     documentTypes: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [filterDocuments, setFilterDocuments] = useState([]);

//   const [data, fetchRepositories] = usePost(
//     `api/AMLight/RepositoriesGet?LoginId=${encodeURIComponent(loginId.login)}`
//   );

  
//   const [openRepo, fetchOpenRepo] = usePost(
//     `api/AMLight/RepositoryOpen`,
//     {
//       loginId: encodeURIComponent(loginId.login),
//       repoId:filters.repos.split(",")[0]
//     }
//   );
//   const [documentTypes, fetchDocumentTypes] = usePost(
//     `api/AMLight/DocumentTypesGet?LoginId=${encodeURIComponent(
//       loginId.repoLogin
//     )}`
//   );
//   const [documents, fetchDocuments] = usePost(
//     `api/AMLight/DocumentSearchAdvanced`,
//     {
//       loginId: encodeURIComponent(loginId.login),
//       documentSearchBody: {
//         Amount: 100,
//         Meta: [
//           {
//             Field: "",
//             Value: "",
//             Operation: 0,
//           },
//         ],
//         ResultIndexingFields: "",
//         FieldOrderBy: "",
//       },
//     }
//   );

//   const [files, fetchFiles] = usePost(
//     `api/AMLight/FileSearchAdvance?LoginId=${encodeURIComponent(
//       loginId.repoLogin
//     )}`,
//     {
//       documentSearchBody: {
//         Operation: 0,
//         OrderBy: 0,
//         Ascending: true,
//         Meta: [
//           {
//             Field: "",
//             Value: "",
//             Operation: 0,
//           },
//         ],
//       },
//     }
//   );

//   useEffect(() => {
//     let isMounted = true;
//     setIsLoading(true);
//     fetchRepositories().finally(() => isMounted && setIsLoading(false));
//     return () => {
//       isMounted = false;
//     };
//   }, []);


//   useEffect(() => {
//     if (openRepo?.LoginId) {
//       setLoginId((prev) => ({ ...prev, repoLogin: openRepo.LoginId }));
//     }
//   }, [openRepo]);

//   useEffect(() => {
//     if (loginId.repoLogin) {
//       let isMounted = true;
//       setIsLoading(true);
//       Promise.all([fetchDocumentTypes(), fetchDocuments(), fetchFiles()]).finally(
//         () => isMounted && setIsLoading(false)
//       );
//       return () => {
//         isMounted = false;
//       };
//     }
//   }, [loginId.repoLogin]);

//   useEffect(() => {
//     if (documentTypes?.Results?.length > 0) {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         documentTypes: documentTypes.Results[0].Key,
//       }));
//     }
//   }, [documentTypes]);

//   useEffect(() => {
//     if (documents?.Results) {
//       let filteredDocs = documents.Results;

//       if (filters.documentTypes) {
//         filteredDocs = filteredDocs.filter(
//           (doc) => doc.DocumentType === filters.documentTypes
//         );
//       }

//       if (filters.startDate && filters.endDate) {
//         filteredDocs = filteredDocs.filter((doc) => {
//           const docDate = new Date(doc.CreationDate);
//           const startDate = new Date(filters.startDate);
//           const endDate = new Date(filters.endDate);
//           return docDate >= startDate && docDate <= endDate;
//         });
//       }

//       setFilterDocuments(filteredDocs);
//       const documentCount = filteredDocs.length;

//       dispatch(
//         addCountEntry({
//           documentNumber: documentCount,
//           repository: filters.repos[0],
//         })
//       );
//     }
//   }, [filters, documents, dispatch]);

//   useEffect(() => {
//     if (files?.Results) {
//       let filteredFiles = files.Results;

//       if (filters.documentTypes) {
//         filteredFiles = filteredFiles.filter((file) =>
//           filterDocuments.some((item) => item.DocumentID === file.DocumentID)
//         );
//       }

//       const totalPages = filteredFiles.reduce(
//         (acc, file) => acc + (file.PageCount || 0),
//         0
//       );

//       dispatch(
//         updateCountEntry({
//           pages: totalPages,
//           files: filteredFiles.length,
//         })
//       );

//       dispatch(
//         updateCountEntry({
//           index: 0,
//           pageNumber: totalPages,
//           fileNumber: filteredFiles.length,
//           documentNumber: filterDocuments.length,
//           repository: filters.repos[0],
//         })
//       );
//     }
//   }, [files, filters, filterDocuments, dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   return (
//     <div
//       className="d-flex flex-column p-3 bg-light"
//       style={{ width: "300px", height: "100vh" }}
//     >
//       <div className="d-flex align-items-center justify-content-between">
//         <h5 className="mb-1">{t("mainTitle")}</h5>
//         <LanguageSwitcher />
//       </div>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <form>
//           {data ? (
//             <InputField
//               label={t("reposSelectTitle")}
//               type="select-checkbox"
//               name="repos"
//               value={filters.repos}
//               onChange={handleInputChange}
//               options={data.Results?.map((item) => ({
//                 label: item.DisplayMember,
//                 value: item.ID,
//               }))}
//             />
//           ) : (
//             <Loading />
//           )}

//           {filters.repos.length > 0 && (
//             <>
//               {data && documentTypes ? (
//                 <InputField
//                   label={t("documentTypeSelectTitle")}
//                   type="select"
//                   name="documentTypes"
//                   value={filters.documentTypes}
//                   onChange={handleInputChange}
//                   options={documentTypes.Results.map((item) => ({
//                     label: item.Value,
//                     value: item.Key,
//                   }))}
//                 />
//               ) : (
//                 <InputField
//                   label={t("documentTypeSelectTitle")}
//                   type="select"
//                   name="documentTypes"
//                   value={filters.documentTypes}
//                   onChange={handleInputChange}
//                   options={[
//                     {
//                       label: "No document types available",
//                       value: "",
//                       disabled: true,
//                     },
//                   ]}
//                 />
//               )}

         

//               <InputField
//                 label={t("startDateInputTitle")}
//                 type="date"
//                 name="startDate"
//                 value={filters.startDate}
//                 onChange={handleInputChange}
//               />
//               <InputField
//                 label={t("endDateInputTitle")}
//                 type="date"
//                 name="endDate"
//                 value={filters.endDate}
//                 onChange={handleInputChange}
//               />
//             </>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { usePost } from "../../Custom Hooks/usePost";
// import InputField from "../InputField/InputField";
// import Loading from "../Loading/Loading";
// import { addRepository, updateRepository, setLoginId } from "../../Redux/itemSlice";
// import { useTranslation } from "react-i18next";

// const Sidebar = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [loginId, setLocalLoginId] = useState({
//     login: "encodedLoginId",
//     repoLogin: "",
//   });

//   const [filters, setFilters] = useState({ repos: "", documentTypes: "", startDate: "", endDate: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const [repositories, fetchRepositories] = usePost(`api/AMLight/RepositoriesGet?LoginId=${encodeURIComponent(loginId.login)}`);
//   const [openRepo, fetchOpenRepo] = usePost(`api/AMLight/RepositoryOpen`);
//   const [documents, fetchDocuments] = usePost(`api/AMLight/DocumentSearchAdvanced`);
//   const [files, fetchFiles] = usePost(`api/AMLight/FileSearchAdvance`);

//   // Fetch repositories on mount
//   useEffect(() => {
//     setIsLoading(true);
//     fetchRepositories().finally(() => setIsLoading(false));
//   }, []);

//   // Handle opening repositories and fetching their data
//   useEffect(() => {
//     if (filters.repos.length > 0) {
//       const selectedRepoIds = filters.repos.split(",");
//       selectedRepoIds.forEach(async (repoId) => {
//         try {
//           const repoResponse = await fetchOpenRepo({ loginId: loginId.login, repoId });
//           const { LoginId: repoLoginId } = repoResponse;

//           if (repoLoginId) {
//             const documentsResponse = await fetchDocuments({
//               loginId: repoLoginId,
//               documentSearchBody: { Amount: 100, Meta: [], ResultIndexingFields: "", FieldOrderBy: "" },
//             });

//             const filesResponse = await fetchFiles({
//               loginId: repoLoginId,
//               documentSearchBody: { Operation: 0, OrderBy: 0, Ascending: true, Meta: [] },
//             });

//             const repositoryData = {
//               repoId,
//               documents: documentsResponse.Results.map(doc => ({
//                 docId: doc.DocumentID,
//                 files: filesResponse.Results.filter(file => file.DocumentID === doc.DocumentID).map(file => ({
//                   fileId: file.FileID,
//                   pageCount: file.PageCount || 0,
//                 })),
//               })),
//             };

//             // Add repository to Redux store
//             dispatch(addRepository(repositoryData));
//           }
//         } catch (error) {
//           console.error(`Failed to fetch data for repository ${repoId}:`, error);
//         }
//       });
//     }
//   }, [filters.repos, loginId.login, fetchOpenRepo, fetchDocuments, fetchFiles, dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   return (
//     <div className="d-flex flex-column p-3 bg-light" style={{ width: "300px", height: "100vh" }}>
//       <h5 className="mb-3">{t("mainTitle")}</h5>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <form>
//           {repositories ? (
//             <InputField
//               label={t("reposSelectTitle")}
//               type="select-checkbox"
//               name="repos"
//               value={filters.repos}
//               onChange={handleInputChange}
//               options={repositories.Results?.map(repo => ({ label: repo.DisplayMember, value: repo.ID }))}
//             />
//           ) : (
//             <Loading />
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputField from "../InputField/InputField";
import Loading from "../Loading/Loading";
import { usePost } from "../../Custom Hooks/usePost";
import { addRepository } from "../../Redux/itemSlice";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import SelectField from "../InputField/SelectField";

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [loginId, setLoginId] = useState({
    login: "A+fZfz9c60p9qEBHywvOgUm3llN23CLtc7gwH3qMfne+YLZoB/jLqirCHsckiCKhkm3J4KTgmC4MBxY91TUC4IfoX22vyh8ACJAdZwGROmLvdtRYkN3rC1bMi6Ip43T9L05hHs6CU+BNc0w/COLIGGo4gu+n8xBJrLLvGLJDkBocasY1wZv8lqNUn2fESLt7ZVg10QjoIpm1aNF3Sg/eXQ==",
    repoLogin: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    repos: [],
    documentTypes: "",
    startDate: "",
    endDate: "",
  });

  // Initialize usePost hooks
  const [data, fetchRepositories] = usePost(
    `api/AMLight/RepositoriesGet`
  );
  const [openRepoData, fetchOpenRepo] = usePost(`api/AMLight/RepositoryOpen`);

  const [documentTypesData, fetchDocumentTypes] = usePost(
    `api/AMLight/DocumentTypesGet`
  );

  const [documentsData, fetchDocuments] = usePost(
    `api/AMLight/DocumentSearchAdvanced`
  );

  const [filesData, fetchFiles] = usePost(
    `api/AMLight/FileSearchAdvance`
  );

  useEffect(() => {
    setIsLoading(true);
    fetchRepositories(
      {loginId : loginId.login}).finally(() => setIsLoading(false));
  }, []);

  const fetchRepositoryData = async (repoId) => {
    try {
      console.log("fetching data for repo", repoId);
      // Open the repository
      await fetchOpenRepo({
        loginId: loginId.login,
        repoId: repoId,
      });
      // setLoginId((prev) => ({ ...prev, repoLogin: prev.repoLogin.push(openRepoData.LoginId) } ));
        // Ensure openRepoData is available before proceeding
    if (openRepoData) {
      setLoginId((prev) => ({ ...prev, repoLogin: openRepoData.LoginId }));
      console.log("openRepoData", openRepoData);
    }

      // Fetch all related data for the repository
      await Promise.all([
        fetchDocumentTypes({loginId:loginId.repoLogin}),
        fetchDocuments({
          loginId: encodeURIComponent(loginId.repoLogin),
          documentSearchBody: {
            Amount: 100,
            Meta: [],
            ResultIndexingFields: "",
            FieldOrderBy: "",
          },
        }),
        fetchFiles({
          LoginId: encodeURIComponent(loginId.repoLogin),
          documentSearchBody: {
            Operation: 0,
            OrderBy: 0,
            Ascending: true,
            Meta: [],
          },
        }),
      ]);

      // Transform data into repository structure
      const repository = {
        repoId,
        documents: documentsData?.Results.map((doc) => ({
          docId: doc.DocumentID,
          docTypeId: doc.DocumentTypeID,
          files: filesData?.Results.filter(
            (file) => file.DocumentID === doc.DocumentID
          ).map((file) => ({
            fileId: file.FileID,
            pageCount: file.PageCount,
          })),
        })),
      };

      // Dispatch repository data to Redux
      dispatch(addRepository(repository));
    } catch (error) {
      console.error(`Failed to fetch data for repository ${repoId}`, error);
    }
  };

  useEffect(() => {
    if (filters.repos.length > 0) {
      setIsLoading(true);
  
      Promise.all(filters.repos.map((repoId) => {fetchRepositoryData(repoId)}))
        .finally(() => setIsLoading(false));
    }
  }, [filters.repos]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectApplyChange = (e) => {
    setFilters((prevFilters) => ({...prevFilters, repos: e}));
  };

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: "300px", height: "100vh" }}>
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-1">{t("mainTitle")}</h5>
        <LanguageSwitcher />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          {data ? (
            <SelectField
            name={"Repos"}
            value={filters.repos} // Convert string back to array for SelectField
            options={data.Results?.map(repo => ({ label: repo.DisplayMember, value: repo.ID }))}
            placeholder={"Select Repositories"}
            disabled={false}
            multiSelect={true}
            onApplyChange={handleSelectApplyChange}
          />
          ) : (
            <Loading />
          )}

          {filters.repos && (
            <>
              <InputField
                label={t("documentTypeSelectTitle")}
                type="select"
                name="documentTypes"
                value={filters.documentTypes}
                onChange={handleInputChange}
                options={
                  documentTypesData?.Results?.map((item) => ({
                    label: item.Value,
                    value: item.Key,
                  })) || []
                }
              />
              <InputField
                label={t("startDateInputTitle")}
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
              />
              <InputField
                label={t("endDateInputTitle")}
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default Sidebar;
