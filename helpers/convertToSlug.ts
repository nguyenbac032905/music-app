import unidecode from "unidecode";
export const slugify = (str) => {
    return unidecode(str).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}