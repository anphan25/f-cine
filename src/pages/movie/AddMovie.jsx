import {
  Stack,
  Box,
  Paper,
  Typography,
  FormLabel,
  Autocomplete,
  TextField,
  FormControl,
  Input,
  Button,
} from "@mui/material";
import {
  CustomDatePicker,
  CustomMultipleInput,
  HeaderBreadcrumbs,
} from "components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getCategoryList } from "../../services/CategoryService";
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../services/MovieService";
import React, { useState, useEffect } from "react";

const coverUploadStyle = {
  backgroundColor: "#D6D6D6",
  width: "100%",
  height: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".cover-upload-icon": {
    display: "block",
    color: "primary.main",
    cursor: "pointer",
  },

  ".cover-upload-icon:hover": {
    color: "primary.dark",
  },

  ".label-upload-cover": { display: "none" },

  img: { display: "none", width: "100%", height: "100%", borderRadius: "5px" },
};

const posterImgStyle = {
  backgroundColor: "#D6D6D6",
  width: "40%",
  height: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",

  ".cover-upload-icon": {
    display: "block",
    cursor: "pointer",
    color: "primary.main",
  },

  ".cover-upload-icon:hover": {
    color: "primary.dark",
  },

  ".label-upload-cover": { display: "none" },

  img: { display: "none", width: "100%", height: "100%", borderRadius: "5px" },
};

const multipleSelectStyle = {
  ".MuiAutocomplete-tag": {
    backgroundColor: "primary.main",
    color: "neutral.0",
  },

  ".MuiChip-deleteIcon": { color: "neutral.0" },

  ".MuiChip-deleteIcon:hover": {
    color: "neutral.400",
    transition: "all 0.5s ease-out",
  },
};

const AddMovie = () => {
  const [data, setData] = useState({ releasedDate: new Date().toISOString() });
  const [categories, setCategories] = useState([]);
  let filesList = [];

  const handleSelectCategories = (e, value) => {
    const cateArr = value.map((cate) => {
      return cate.id;
    });

    setData({
      ...data,
      categoryIDs: cateArr,
    });
  };

  const handleGetMultipleValues = (values) => {
    // setData({ ...data, actors: values });
    setData((pre) => ({ ...pre, actors: values }));
  };

  const imagePreviewHandler = (files, elementId) => {
    filesList = files;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      const imgCover = document.querySelector(`#${elementId}`);
      imgCover.style.display = "block";
      imgCover.src = reader.result;
    });
    reader.readAsDataURL(filesList[0]);
  };

  const uploadImage = async (inputFileElement, type) => {
    const filePath = `movie-images/`;

    const file = inputFileElement.files[0];
    const name = file.name;
    const storageRef = ref(storage, `${filePath}/${name}`);
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type === "cover") {
            // setData({ ...data, coverImgURL: downloadURL });
            console.log("set cover");
            setData((pre) => ({ ...pre, coverImgURL: downloadURL }));
          }

          if (type === "poster") {
            // setData({ ...data, posterImgURL: downloadURL });
            console.log("set poster");

            setData((pre) => ({ ...pre, posterImgURL: downloadURL }));
          }
        });
      }
    );
  };

  const handleAddMovie = async () => {
    //Cover
    await uploadImage(document.querySelector("#upload-cover-input"), "cover");

    // //Poster
    await uploadImage(document.querySelector("#upload-poster-input"), "poster");

    await createMovie(data);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      const res = await getCategoryList();

      setCategories(res.categories);
    };

    fetchCategoryData();
  }, []);

  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Add movie"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Movie List", to: "/movies" },
            { name: "Add Movie" },
          ]}
        />
      </Stack>

      <Paper elevation={2} sx={coverUploadStyle}>
        <AddPhotoAlternateIcon
          onClick={() => {
            document.querySelector("#upload-cover-input").click();
          }}
          className="cover-upload-icon"
          sx={{
            width: "100px",
            height: "100px",
            opacity: "70%",
            display: "none",
            position: "absolute",
            zIndex: "100",
          }}
        ></AddPhotoAlternateIcon>
        <img id="img-cover" src="" />

        <Input
          id="upload-cover-input"
          type="file"
          sx={{ display: "none" }}
          onChange={(e) => {
            imagePreviewHandler(e.target.files, "img-cover");
          }}
        />
      </Paper>

      <Stack direction="row" sx={{ marginTop: "40px" }} spacing={5}>
        <Paper sx={posterImgStyle} elevation={2}>
          <AddPhotoAlternateIcon
            onClick={() => {
              document.querySelector("#upload-poster-input").click();
            }}
            className="cover-upload-icon"
            sx={{
              width: "100px",
              height: "100px",
              opacity: "70%",
              display: "none",
              position: "absolute",
              zIndex: "100",
            }}
          ></AddPhotoAlternateIcon>
          <img id="img-poster" src="" />

          <Input
            id="upload-poster-input"
            type="file"
            sx={{ display: "none" }}
            onChange={(e) => {
              imagePreviewHandler(e.target.files, "img-poster");
            }}
          />
        </Paper>

        <Paper elevation={2} sx={{ width: "60%", padding: "20px" }}>
          <Stack className="input-movie-detail">
            <Stack spacing={1} mb={3}>
              <FormLabel
                htmlFor="title"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Title
              </FormLabel>
              <Input
                placeholder="Title"
                required
                id="title"
                onChange={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
              />
            </Stack>

            <Stack spacing={1} mb={3}>
              <FormLabel
                htmlFor="age-restricted"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Age Limitation
              </FormLabel>
              <Input
                required
                placeholder="Age Limitation"
                id="age-restricted"
                onChange={(e) => {
                  setData({
                    ...data,
                    restrictedAge: e.target.value,
                  });
                }}
              />
            </Stack>

            <Stack spacing={1} mb={3}>
              <FormLabel
                htmlFor="duration"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Running Time
              </FormLabel>
              <Input
                required
                placeholder="Running Time"
                type="number"
                id="duration"
                onChange={(e) => {
                  setData({
                    ...data,
                    duration: e.target.value,
                  });
                }}
              />
            </Stack>

            <Stack spacing={1} mb={3}>
              <FormLabel
                htmlFor="release-date"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Release Date
              </FormLabel>
              <CustomDatePicker
                id="release-date"
                onDateChange={(value) => {
                  setData({
                    ...data,
                    releasedDate: value.toISOString(),
                  });
                }}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="category"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Categories
              </FormLabel>
              <Autocomplete
                sx={multipleSelectStyle}
                multiple
                name="category"
                id="category"
                options={categories}
                // value={data?.districtName}
                getOptionLabel={(option) => option.name || ""}
                onChange={handleSelectCategories}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Categories" />
                )}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Paper elevation={2} sx={{ marginTop: "40px", padding: "20px" }}>
        <Stack spacing={1} mb={3}>
          <FormLabel
            htmlFor="language"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Language
          </FormLabel>
          <Input
            required
            placeholder="Language"
            id="language"
            onChange={(e) => {
              setData({
                ...data,
                language: e.target.value,
              });
            }}
          />
        </Stack>

        <Stack spacing={1} mb={3}>
          <FormLabel
            htmlFor="trailerUrl"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Trailer Url
          </FormLabel>
          <Input
            required
            placeholder="Trailer Url"
            id="trailerUrl"
            onChange={(e) => {
              setData({
                ...data,
                trailerURL: e.target.value,
              });
            }}
          />
        </Stack>

        <Stack spacing={1} mb={3}>
          <FormLabel
            htmlFor="director"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Director
          </FormLabel>
          <Input
            required
            placeholder="Director"
            id="director"
            onChange={(e) => {
              setData({
                ...data,
                director: e.target.value,
              });
            }}
          />
        </Stack>

        <Stack spacing={1} mb={3}>
          <FormLabel
            htmlFor="actor"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Actors/Actresses
          </FormLabel>
          <CustomMultipleInput
            required
            id="actor"
            handleGetMultipleValues={handleGetMultipleValues}
            placeholder="Actors/Actresses"
          />
        </Stack>

        <Stack spacing={1} mb={3}>
          <FormLabel
            htmlFor="description"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Description
          </FormLabel>
          <TextField
            required
            multiline
            rows={4}
            placeholder="Description"
            id="description"
            onChange={(e) => {
              setData({
                ...data,
                description: e.target.value,
              });
            }}
          />
        </Stack>
      </Paper>

      <Box
        justifyContent="center"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        <Button variant="contained" onClick={handleAddMovie}>
          Add movie
        </Button>
      </Box>
    </>
  );
};

export default AddMovie;
