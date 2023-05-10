import { Link } from "react-router-dom";
import * as React from 'react';
import { Divider, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UploadModal from './UploadModal';

// 기존 기능 복구시 활성화
// import { Button, Stack, TextField } from '@mui/material';

export default function Nav(props) {

    const handleSearchTermChange = (event) => {
        if (event.key === 'Enter') {
            //this.setState({ searchTerm: event.target.value });
            props.setValue(event.target.value);
        }
    };

    // const handleSearchTermChangeOnclick = (event) => {
    //     if (event.onClick === 'Enter') {
    //         //this.setState({ searchTerm: event.target.value });
    //         props.setValue(event.target.value);
    //     }
    // };


    return (
        <>
            <header
                style={{
                    position: 'fixed',
                    top: '0',
                    width: '100%',
                    height: '80px',
                    zIndex: 999,
                    margin: 'auto',
                    backgroundColor: 'white',
                    display: 'flex',
                    flex: '1 1 auto',
                    justifycontent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div className="nav logo"
                    style={{
                        width: '50px',
                        height: '50px',
                        marginLeft: '10px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        flexGrow: 0,
                        flexShrink: 0,
                        flexbasis: 'auto'
                    }}>
                    <h1
                        style={{
                            marginTop: '4px',
                            transform: 'scale(1.8)',
                            width: '50px',
                            height: '70px',
                            backgroundSize: "cover",
                            backgroundImage: `url(../images/logo.png)`,
                            backgroundPosition: "center center",
                        }} />
                </div>

                <UploadModal />


                <div style={{
                    flexGrow: 1,
                    minWidth: '200px',
                }}>
                    <Paper
                        component="form"
                        variant="outlined"
                        sx={{ p: '2px 4px', mr: 1, display: 'flex', alignItems: 'center' }}
                    >
                        <InputBase
                            fullWidth
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="원하시는 움짤을 검색해보세요"
                            inputProps={{ 'aria-label': '원하시는 움짤을 검색해보세요' }}
                            onKeyDown={handleSearchTermChange}
                        />
                        <Tooltip title="검색실행">
                            <IconButton
                                type="button"
                                sx={{ p: '10px' }}
                                aria-label="search"
                                onClick={handleSearchTermChange}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    </Paper>

                    {/* 검색 보존용 코드 */}
                    {/* <Stack
                        spacing={0}
                        direction="row"
                        sx={{ mt: "6px" }}>
                        <TextField
                            // InputLabelProps="원하시는 움짤을 검색해보세요"
                            fullWidth
                            id="searchBox"
                            placeholder="원하시는 움짤을 검색해보세요"
                            variant="outlined"
                            onKeyDown={handleSearchTermChange}
                            size="small"
                            sx={{
                                // height: "10px"
                            }}
                        />
                        <Button
                            variant="text"
                            onClick={handleSearchTermChange}
                            style={{ ml: 1, fontWeight: "bold" }}
                        >
                            <SearchIcon
                                color="action"
                                sx={{ fontSize: 30 }}
                            />
                        </Button>
                    </Stack> */}

                </div>
                <div style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexbasis: 'auto',
                }}>
                    <Tooltip title="로그인">
                        <Link
                            to="/Login"
                            style={{
                                marginLeft: "5px",
                                marginRight: "10px",
                                fontWeight: 'bold',
                            }}
                        >
                            {/* 로그인 */}
                            <AccountCircleIcon
                                color='action'
                                fontSize='large'
                            />
                        </Link>
                    </Tooltip>

                </div>
                {/*  메뉴 서랍용 버튼: 불필요하면 버리기 */}
                {/* <div
                    style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        flexGrow: 0,
                        flexShrink: 0,
                        flexbasis: 'auto'
                    }}>
                <a href="#">
                        <p
                            style={{
                                background: 'black',
                                color: 'white',
                                border: 'transparent 0px',
                                width: '60px',
                                height: '60px',
                                fontWeight: 'bolder',
                                fontsize: '15px',
                                textAlign: 'center',
                                lineHeight: '60px'
                            }}>메뉴</p>
                    </a>
                </div> */}
            </header>


        </>
    )
}