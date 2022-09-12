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
import { initialHeader, saveDataCSV } from "./utils/jsonToCSV";
import papaparse from "papaparse";

export default function App() {
    const refInput = useRef();
    const [listFiles, setListFiles] = useState([]);
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
        refFiles.current = [];
        setListFiles([...newList]);
    }

    useEffect(() => {
        for (let i = 0; i < listFiles.length; i++) {
            exifr.parse(listFiles[i].fileObjectURL).then((output) => {
                const fileName = listFiles[i].file?.name;
                const fileType = listFiles[i].file?.type;
                const newObj = {
                    ...initialHeader,
                    ...output,
                    id: i + 1,
                    FileName: fileName,
                    FileType: fileType,
                };
                refFiles.current.push(newObj);
            });
        }
    }, [listFiles]);

    function downloadFiles() {
        async function loadEXIF() {
            if (refFiles.current.length === 0) {
                alert("Please choose a file!");
                return;
            }
            const fileName = "EXIF to CSV";
            const csv = papaparse.unparse(refFiles.current);
            saveDataCSV(fileName, csv);
        }

        loadEXIF();
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
