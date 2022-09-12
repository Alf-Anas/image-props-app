import {
    ChakraProvider,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import exifr from "exifr";
import { saveDataCSV } from "./utils/jsonToCSV";
import papaparse from "papaparse";

const initialHeader = ["ID", "FileName", "FileType"];

export default function App() {
    const refInput = useRef();
    const [listFiles, setListFiles] = useState([]);
    const refHeader = useRef([...initialHeader]);
    const refFiles = useRef([]);

    function onChooseFiles(e) {
        const files = e.target.files;
        const newList = [];
        for (let i = 0; i < files.length; i++) {
            newList.push({
                id: i,
                file: files[i],
                fileObjectURL: URL.createObjectURL(files[i]),
            });
        }
        refHeader.current = [...initialHeader];
        refFiles.current = [];
        setListFiles([...newList]);
    }

    useEffect(() => {
        for (let i = 0; i < listFiles.length; i++) {
            exifr.parse(listFiles[i].fileObjectURL).then((output) => {
                const fileName = listFiles[i].file?.name;
                const fileType = listFiles[i].file?.type;
                const listOutputKey = Object.keys(output);
                refHeader.current = [...refHeader.current, ...listOutputKey];
                refFiles.current.push({
                    ...output,
                    ID: i + 1,
                    FileName: fileName,
                    FileType: fileType,
                });
            });
        }
    }, [listFiles]);

    function downloadFiles() {
        if (refFiles.current.length === 0) {
            alert("Please choose a file!");
            return;
        }
        const listHeader = [...new Set(refHeader.current)];
        const allHeader = {};
        listHeader.forEach((item) => {
            allHeader[item] = "";
        });
        const newJSONFiles = refFiles.current.map((item) => {
            return { ...allHeader, ...item };
        });
        const fileName = "EXIF-to-CSV_GeoIT-Dev";
        const csv = papaparse.unparse(newJSONFiles);
        saveDataCSV(fileName, csv);
    }

    return (
        <ChakraProvider>
            <Layout>
                <Modal isOpen={true} opacity="0.2">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Convert Image File EXIF to CSV</ModalHeader>
                        <ModalBody>
                            <Input
                                ref={refInput}
                                placeholder="Basic usage"
                                type="file"
                                multiple
                                accept="image/*,audio/*,video/*"
                                onChange={onChooseFiles}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                variant="ghost"
                                mr={3}
                                onClick={() => {
                                    refInput.current.value = null;
                                    refFiles.current = [];
                                }}
                            >
                                Clear
                            </Button>
                            <Button variant="outline" colorScheme="teal" onClick={downloadFiles}>
                                Download CSV
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Layout>
        </ChakraProvider>
    );
}
