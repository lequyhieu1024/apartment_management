<?php
namespace App\Repositories;

abstract class BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct()
    {
        $this->model = app()->make($this->getModel());
    }

    /**
     * Lấy tên class model tương ứng.
     *
     * @return string
     */
    abstract public function getModel();

    /**
     * Lấy danh sách id và name.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getNameAndIds()
    {
        return $this->model->select('id', 'name')->orderBy('id', 'DESC')->get();
    }

    /**
     * Lấy danh sách id và name (không sắp xếp, dùng cho TreeSelect).
     *
     * @return \Illuminate\Support\Collection
     */
    public function getNameAndIdTreeSelect() {
        return $this->model->select('id', 'name')->get();
    }

    /**
     * Lấy danh sách có phân trang.
     *
     * @param array $data ['size' => int]
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAll($data)
    {
        return $this->model->paginate($data['size'] ?? 10);
    }

    /**
     * Lấy toàn bộ bản ghi (không phân trang).
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllNotPaginate()
    {
        return $this->model->orderBy('id', 'DESC')->get();
    }

    /**
     * Lấy toàn bộ bản ghi có is_active = 1 (không phân trang).
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllNotPaginateActive()
    {
        return $this->model->where('is_active', 1)->orderBy('id', 'DESC')->get();
    }

    /**
     * Lấy danh sách id, name với is_active = 1.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getNameAndIdsActive() {
        return $this->model->select('id', 'name')->where('is_active', 1)->orderBy('id', 'DESC')->get();
    }

    /**
     * Tạo bản ghi mới.
     *
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Tìm bản ghi theo id (not found sẽ throw exception).
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Tìm bản ghi theo id (có thể trả null).
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Lấy bản ghi đầu tiên theo field.
     *
     * @param string $field
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function getOneBy($field, $value)
    {
        return $this->model->where($field,$value)->first();
    }

    /**
     * Lấy danh sách bản ghi theo field.
     *
     * @param string $field
     * @param mixed $value
     * @return \Illuminate\Support\Collection
     */
    public function getBy($field, $value)
    {
        return $this->model->where($field, $value)->get();
    }

    /**
     * Lấy danh sách bản ghi theo mảng id.
     *
     * @param string $field
     * @param array $values
     * @return \Illuminate\Support\Collection
     */
    public function findWhereIn($field, array $values)
    {
        return $this->model->whereIn($field, $values)->get();
    }

    /**
     * Query builder whereIn (chưa get).
     *
     * @param string $field
     * @param array $values
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function findWhereInModel($field, array $values)
    {
        return $this->model->whereIn($field, $values);
    }

    /**
     * Lấy bản ghi đầu tiên theo cột.
     *
     * @param string $column
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function firstWhere($column, $value) {
        return $this->model->where($column, $value)->first();
    }

    /**
     * Cập nhật bản ghi theo id.
     *
     * @param array $data
     * @param int $id
     * @return bool
     */
    public function update(array $data, $id)
    {
        $model = $this->model->findOrFail($id);
        return $model->update($data);
    }

    /**
     * Toggle trạng thái is_active.
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function toggleStatus($id)
    {
        $model = $this->model->findOrFail($id);
        $model->update(['is_active' => !$model->is_active]);
        return $model;
    }

    /**
     * Xóa bản ghi theo id.
     *
     * @param int $id
     * @return bool|null
     */
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    /**
     * Xóa nhiều bản ghi theo id.
     *
     * @param array|int $ids
     * @return int
     */
    public function deleteMany($ids)
    {
        if (is_array($ids)) {
            return $this->model->destroy($ids);
        }
        return $this->model->destroy([$ids]);
    }
}
