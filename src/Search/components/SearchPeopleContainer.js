import React from "react";
import { inject, observer } from "mobx-react";
import { FormControl, Grid, Input, InputAdornment } from "@material-ui/core";

import { SearchPeopleList } from "../../Search/components";
import { localized } from "../../localization/components";

const _SearchPeopleContainer = ({ searchValue, setSearchValue }) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <FormControl>
                    <Input
                        id="input-with-icon-adornment"
                        placeholder={"Search"}
                        value={searchValue}
                        autoComplete={"off"}
                        onChange={e => setSearchValue(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <img src="/search.png" />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <SearchPeopleList />
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ searchUsers }) => ({
    setSearchValue: searchUsers.setSearchValue,
    searchValue: searchUsers.searchValue
});

export const SearchPeopleContainer = localized(
    inject(mapMobxToProps)(observer(_SearchPeopleContainer))
);
